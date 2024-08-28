import { useCallback, useEffect, useRef, useState } from 'react';
import '../styles/ShopWindow.scss';
import Close from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import classnames from 'classnames';

type Props = {
  title: string;
  description?: string;
  items: Array<Item>;
  onClose: () => void;
};

type Item = {
  name?: string;
  link: string;
};

const imgHost = 'https://images.plurk.com/';
const imgHostsm = 'https://images.plurk.com/mx_';

const Item = (props: { urlpre: string; link: string; altText: string; pre: string; onClick?: () => void }) => {
  return (
    <div className={`${props.pre}__item-container`} onClick={props.onClick}>
      <img src={`${props.urlpre}${props.link}`} alt={props.altText} />
    </div>
  );
};

const ShopWindowDisplay = ({
  prefix,
  items,
  activeItem,
  onItemClick,
}: {
  prefix: string;
  items: Array<Item>;
  activeItem: number;
  onItemClick: (idx: number) => void;
}) => {
  const organizeShelves = ({ pre }: { pre: string }) => {
    return items.map((item, idx) => {
      const altText = `item-${idx}-${item.name}`;
      return (
        <div key={altText}>
          <Item urlpre={imgHostsm} link={item.link} altText={altText} pre={pre} onClick={() => onItemClick(idx)} />
        </div>
      );
    });
  };
  return (
    <>
      <div className={prefix}>
        <div className={`${prefix}__left`} onClick={() => onItemClick(activeItem - 1)}>
          <KeyboardArrowLeftIcon className={`${prefix}__arrow`} />
        </div>
        <Item urlpre={imgHost} link={items[activeItem].link} altText='Current item displayed' pre={prefix} />
        <div className={`${prefix}__right`} onClick={() => onItemClick(activeItem + 1)}>
          <KeyboardArrowRightIcon className={`${prefix}__arrow`} />
        </div>
      </div>
      <div className={`${prefix}__shelf`}>{items.length > 0 && organizeShelves({ pre: `${prefix}__shelf` })}</div>
    </>
  );
};

const ShopWindow = ({ items, description, title, onClose }: Props) => {
  const prefix = 'shop-window';
  const activeIdx = useRef(0);
  const [activeItem, setActiveItem] = useState<number>(0);

  const move = (next: number) => {
    if (next >= items.length) {
      activeIdx.current = 0;
    } else if (next < 0) {
      activeIdx.current = items.length - 1;
    } else {
      activeIdx.current = next;
    }
    setActiveItem(activeIdx.current);
  };

  const onPress = (evt: KeyboardEvent) => {
    evt.preventDefault();
    switch (evt.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        move(activeIdx.current - 1);
        break;
      case 'Tab':
      case 'ArrowDown':
      case 'ArrowRight':
        move(activeIdx.current + 1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    addEventListener('keydown', onPress);
    return () => {
      removeEventListener('keydown', onPress);
    };
  }, []);

  return (
    <div className={prefix}>
      <div className={`${prefix}__container`}>
        <div className={`${prefix}__header`}>
          <div className={`${prefix}__header__title`}>{title}</div>
          <div className={`${prefix}__header__desc`}>{description}</div>
          <div className={`${prefix}__close`} onClick={onClose}>
            <Close />
          </div>
        </div>
        <div className={`${prefix}__content`}>
          <ShopWindowDisplay
            items={items}
            prefix={`${prefix}__display`}
            activeItem={activeItem}
            onItemClick={(idx) => move(idx)}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopWindow;
