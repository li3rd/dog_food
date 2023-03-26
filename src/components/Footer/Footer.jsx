import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faInstagram, faTelegram, faViber, faVk, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

import {ReactComponent as Logo} from '../icons/logo.svg'


import footerStyles from './Footer.module.css'




export function Footer () {

  return (
    <div className={footerStyles.footer}>
      <div className={footerStyles.copyright}>
        <Link to="/">
          <Logo className={footerStyles.logo}/>
        </Link>
        <span>&#169; &#171;Интернет-магазин DogFood.ru&#187;</span>
      </div>
      <div className={footerStyles.links}>
        <ul>
          <li><Link to={'/products'}>Каталог</Link></li>
          <li><Link>Акции</Link></li>
          <li><Link>Новости</Link></li>
          <li><Link>Отзывы</Link></li>
        </ul>
      </div>
      <div className={footerStyles.links}>
        <ul>
          <li><Link>Оплата и доставка</Link></li>
          <li><Link>Часто спрашивают</Link></li>
          <li><Link>Обратная связь</Link></li>
          <li><Link>Контакты</Link></li>
        </ul>
      </div>
      <div className={footerStyles.contacts}>
        <p>8 (800) 555 35 35</p>
        <p>Проще позвонить</p>
        <span>dogfood.ru@gmail.com</span>
        <ul>
          <li><FontAwesomeIcon icon={faTelegram}/></li>
          <li><FontAwesomeIcon icon={faWhatsapp}/></li>
          <li><FontAwesomeIcon icon={faViber}/></li>
          <li><FontAwesomeIcon icon={faInstagram}/></li>
          <li><FontAwesomeIcon icon={faVk}/></li>
        </ul>
      </div>
    </div>
  )
}