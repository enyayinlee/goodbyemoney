import { useState } from "react";
import '../styles/ShopWindow.scss'

const prefix = 'shop-window'

type Props = {
  title: string;
  description?: string;
  items: Array<Item>
}
type Item = {
  name?: string;
  link: string;
}

const Item = (props: { link: string, altText: string, pre: string }) => {
  return <div className={`${props.pre}__item-container`}>
    <img src={props.link} alt={props.altText} />
  </div>
}

const ShopWindow = ({ items, description, title }: Props) => {
  const [activeItem, setActiveItem] = useState<number>(0)

  const organizeShelves = ({ pre }: { pre: string }) => {
    return items.map((item, idx) => {
      const altText = `item-${idx}-${item.name}`
      return <Item link={item.link} altText={altText} key={altText} pre={pre} />
    })
  }

  return <div className={prefix}>
    <div className={`${prefix}__container`}>
      <div className={`${prefix}__display`}>
        <Item link={items[activeItem].link} altText="Current item displayed" pre={prefix} />
      </div>
      <div className={`${prefix}__package`}>
        <div className={`${prefix}__title`}>{title}</div>
        <div className={`${prefix}__description`}>{description}</div>
        <div className={`${prefix}__shelf`}>
          {items.length > 0 && organizeShelves({ pre: `${prefix}__shelf` })}</div>
      </div>
    </div>
  </div>
}

export default ShopWindow