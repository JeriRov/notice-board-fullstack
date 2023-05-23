import React from 'react';

import clsx from 'clsx';
import { FiMessageSquare, FiLogOut, FiClipboard } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';

import { Container } from '../../containers/Container/Container';
import { useAuth } from '../../store/auth/useAuth';

export const Header = () => {
  const { isLoggedIn, logOut, user } = useAuth();

  const handleLogOut = () => {
    logOut();
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    clsx(
      'py-navItem flex items-center hover:text-swipesell-primary-50/80 hover:no-underline',
      {
        'text-swipesell-primary-50': !isActive,
        'text-swipesell-primary-50/40': isActive,
      },
    );

  const username = `${user?.firstName} ${user?.lastName}`;
  return (
    <header>
      <nav className="px-64 py-4 bg-swipesell-slate-700">
        <Container>
          <div className="flex justify-between items-center">
            <Link className="font-poppins text-2xl mr-8 text-white" to="/">
              SwipeSell
            </Link>
            <ul className="pl-0 mb-0 list-none flex items-center">
              <li className="ml-4">
                <NavLink className={navLinkClasses} to="/notices">
                  <FiClipboard className={'mx-1'} size={18} />
                  Публікації
                </NavLink>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="ml-4">
                    <NavLink className={navLinkClasses} to="/messages">
                      <FiMessageSquare className={'mx-1'} size={18} />
                    </NavLink>
                  </li>
                  <li className="ml-4">
                    <NavLink className={navLinkClasses} to={`/@${user?.id}`}>
                      <img
                        alt={`${username} avatar`}
                        className="w-6 h-6 rounded-full inline mr-2"
                        src={user?.avatar || 'https://via.placeholder.com/150'}
                      />
                      {username}
                    </NavLink>
                  </li>
                  <li className="ml-4">
                    <NavLink
                      className="text-swipesell-slate-700 font-medium bg-swipesell-primary-50 px-2 py-1 hover:bg-swipesell-slate-700 hover:text-swipesell-primary-50 rounded"
                      to={`/sell`}>
                      Публікація
                    </NavLink>
                  </li>
                  <li className="ml-3">
                    <NavLink
                      className={navLinkClasses({ isActive: false })}
                      onClick={handleLogOut}
                      to="/">
                      <FiLogOut className={'mx-1'} size={18} />
                      Вийти
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="ml-4">
                    <NavLink className={navLinkClasses} to="/sign-in">
                      Вхід
                    </NavLink>
                  </li>
                  <li className="ml-4">
                    <NavLink className={navLinkClasses} to="/sign-up">
                      Реєстрація
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </Container>
      </nav>
    </header>
  );
};
