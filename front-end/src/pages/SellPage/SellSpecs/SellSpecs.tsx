import { ChangeEventHandler, FC } from 'react';

import { CustomTextInput } from '../../../components/CustomTextInput/CustomTextInput';
import { Characteristic } from '../../../services/notices/noticesApi';

interface SellSpecsProps {
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  characteristics: Characteristic[];
}
export const SellSpecs: FC<SellSpecsProps> = ({
  onInputChange: handleInputChange,
  characteristics,
}) => {
  return (
    <div>
      <ul>
        {characteristics.map(characteristic => {
          return (
            <li key={characteristic.name}>
              <CustomTextInput
                className={'border-b-2 w-2/3'}
                name={characteristic.name}
                onChange={handleInputChange}
                placeholder={'Введіть ' + characteristic.name}
                required={true}
                title={characteristic.name}
                type={characteristic.type}
                value={characteristic?.value}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
