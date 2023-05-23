import React, { FC, useCallback, useEffect, useState } from 'react';

import { FiEdit } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';

import { CustomButton } from '../../components/CustomButton/CustomButton';
import { WhiteCard } from '../../containers/WhiteCard/WhiteCard';
import {
  CitiesParams,
  Notice,
  useLazyGetNoticeByIdQuery,
  useLazyGetUserByIdQuery,
  useLazyGetUserCityQuery,
  UserParams,
} from '../../services/notices/noticesApi';
import { useAuth } from '../../store/auth/useAuth';

import { NoticeBannerCard } from './NoticeBannerCard/NoticeBannerCard';
import { NoticeInfoCard } from './NoticeInfoCard/NoticeInfoCard';
import { NoticeUserInfoCard } from './NoticeUserInfoCard/NoticeUserInfoCard';

export const NoticePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [notice, setNotice] = useState<Notice>();
  const [city, setCity] = useState<CitiesParams>();
  const [fetchUser, setFetchUser] = useState<UserParams>();
  const [getNoticeByIdTrigger] = useLazyGetNoticeByIdQuery();
  const [getUserCityTrigger] = useLazyGetUserCityQuery();
  const [getUserByIdTrigger] = useLazyGetUserByIdQuery();
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const noticeData = await getNoticeByIdTrigger({ id: id || '' }, false);
    const fetchUser = await getUserByIdTrigger(
      { id: noticeData.data?.userId || '' },
      false,
    );
    const cityData = await getUserCityTrigger(
      { cityId: fetchUser.data?.cityId || '' },
      false,
    );
    setFetchUser(fetchUser.data);
    setNotice(noticeData.data);
    setCity(cityData.data || ({} as CitiesParams));
  }, [getNoticeByIdTrigger, getUserByIdTrigger, getUserCityTrigger, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleEditButton = () => {
    navigate(`/edit-notice/${id}`);
  };
  return (
    <div className={'px-32'}>
      <div className={'flex'}>
        <WhiteCard className={'flex m-4 w-2/3 mx-5'}>
          <NoticeBannerCard photos={notice?.photos || []} />
        </WhiteCard>
        <WhiteCard className={'flex m-4 w-1/2 mx-5'}>
          <NoticeUserInfoCard city={city} user={fetchUser} />
        </WhiteCard>
        {notice?.userId === user?.id && (
          <div className={'fixed right-10 bottom-10'}>
            <CustomButton onClick={handleEditButton} title={'Редагувати'}>
              <FiEdit size={28} />
            </CustomButton>
          </div>
        )}
      </div>
      <NoticeInfoCard notice={notice} />
    </div>
  );
};
