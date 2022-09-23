import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import arrowDownSvg from "@icons/arrow-down.svg";

const UserMenu = ({ userEmail, showNav, handleMenuNav, setCurrentUser }) => {
    const router = useRouter();
    const singOut = () => {
        setCurrentUser(null);
        router.push("/login");
    };

    return (
        <div className="email-menu">
            <div onClick={handleMenuNav} className="email-menu__front">
              <span className="email-menu__text">{userEmail}</span>
              <Image
                src={arrowDownSvg}
                width={8}
                height={5}
                objectFit="fill"
                alt="arrow down image"
              />
            </div>
            <div className={`email-menu__list ${showNav ? "show-section" : ""}` }>
                <ul className="email-list-ul">
                    <li className="email-list-ul__item">
                        <Link href="/my-orders" className="style-no-link">My orders</Link>
                    </li>
                    <li className="email-list-ul__item">
                        <Link href="/my-account" className="style-no-link">My account</Link>
                    </li>
                    <button onClick={singOut} className="email-list-ul__item menu-tab__logging">
                        Sign out
                    </button>
                </ul>
            </div>
        </div>
    );
}

export { UserMenu };
