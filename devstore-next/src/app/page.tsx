"use client";
import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const video = document.getElementById('background-video') as HTMLVideoElement;
    if (video) {
      video.play().catch(error => {
        console.log("Autoplay failed:", error);
      });
    }

    const eventsListenerScript = document.createElement('script');
    eventsListenerScript.async = true;
    eventsListenerScript.src = "https://cdn.fourthwall.com/shop-event-listener/shop-events-listener.js";
    document.head.appendChild(eventsListenerScript);

    return () => {
      document.head.removeChild(eventsListenerScript);
    }
  }, []);

  return (
    <div className="page">
      <header data-page-header className="page__header">
        <div id="fw-section-header" className="fw-section">
          <div data-testid="main.single.section" className="header">
            <div className="container wrapper">
              <div className="header__sections">
                <div className="header__section header__section--hamburger hidden@md">
                  <button data-drawer-trigger-primary="mobile-menu" className="header__icon header__icon--hamburger">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 3.75H20M0 10H20M0 16.25H20" vectorEffect="non-scaling-stroke" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                </div>
                <div className="header__section header__section--left visible@md">
                  <div className="header__mode-switch">
                    <label className="switch">
                      <input data-mode-switch type="checkbox" className="switch__input" />
                      <span className="switch__slider">
                        <span className="switch__icon switch__icon--on">
                          <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.6" d="M15.7784 14.092C13.9975 14.8371 11.9949 14.8411 10.2112 14.1031C8.42736 13.3651 7.00849 11.9455 6.26669 10.1566C5.52488 8.36778 5.5209 6.35619 6.25562 4.56439C6.99035 2.7726 8.40359 1.34736 10.1844 0.60223V0.60223C10.4474 0.475882 10.4207 0.135018 10.1322 0.0912969C8.60008 -0.1409 7.02724 0.0711922 5.60216 0.711822C4.50177 1.15537 3.50037 1.81468 2.65643 2.65125C1.8125 3.48782 1.14294 4.4849 0.686847 5.58426C0.230755 6.68362 -0.00273027 7.86324 2.40878e-05 9.05424C0.00277844 10.2452 0.241717 11.4238 0.702889 12.521C1.16406 13.6182 1.83823 14.6121 2.68602 15.4448C3.53382 16.2774 4.53825 16.932 5.64068 17.3704C6.74311 17.8088 7.92145 18.0222 9.10689 17.9982C10.2923 17.9741 11.4611 17.7131 12.545 17.2303C13.984 16.651 15.2262 15.6842 16.1415 14.4471C16.2939 14.241 16.0064 13.9748 15.7784 14.092V14.092Z" fill="currentColor" />
                          </svg>
                        </span>
                        <span className="switch__icon switch__icon--off">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                              <path d="M13 8.99999C13 11.2091 11.2091 13 8.99999 13C6.79085 13 4.99999 11.2091 4.99999 8.99999C4.99999 6.79085 6.79085 4.99999 8.99999 4.99999C11.2091 4.99999 13 6.79085 13 8.99999Z" fill="currentColor" />
                              <path fillRule="evenodd" clipRule="evenodd" d="M12.7929 5.29288C12.4024 4.90236 12.4024 4.26919 12.7929 3.87867L14.2071 2.46446C14.5976 2.07393 15.2308 2.07393 15.6213 2.46446C16.0118 2.85498 16.0118 3.48814 15.6213 3.87867L14.2071 5.29288C13.8166 5.68341 13.1834 5.68341 12.7929 5.29288Z" fill="currentColor" />
                              <path fillRule="evenodd" clipRule="evenodd" d="M5.20711 5.29288C5.59763 4.90236 5.59763 4.26919 5.20711 3.87867L3.79289 2.46446C3.40237 2.07393 2.7692 2.07393 2.37868 2.46446C1.98816 2.85498 1.98816 3.48814 2.37868 3.87867L3.79289 5.29288C4.18342 5.68341 4.81658 5.68341 5.20711 5.29288Z" fill="currentColor" />
                              <path fillRule="evenodd" clipRule="evenodd" d="M9 0C9.55229 0 10 0.447715 10 1V3C10 3.55228 9.55229 4 9 4C8.44772 4 8 3.55228 8 3V1C8 0.447715 8.44772 0 9 0Z" fill="currentColor" />
                              <path fillRule="evenodd" clipRule="evenodd" d="M12.7929 12.7071C12.4024 13.0976 12.4024 13.7308 12.7929 14.1213L14.2071 15.5355C14.5976 15.9261 15.2308 15.9261 15.6213 15.5355C16.0118 15.145 16.0118 14.5119 15.6213 14.1213L14.2071 12.7071C13.8166 12.3166 13.1834 12.3166 12.7929 12.7071Z" fill="currentColor" />
                              <path fillRule="evenodd" clipRule="evenodd" d="M5.20711 12.7071C5.59763 13.0976 5.59763 13.7308 5.20711 14.1213L3.79289 15.5355C3.40237 15.9261 2.7692 15.9261 2.37868 15.5355C1.98816 15.145 1.98816 14.5119 2.37868 14.1213L3.79289 12.7071C4.18342 12.3166 4.81658 12.3166 5.20711 12.7071Z" fill="currentColor" />
                              <path fillRule="evenodd" clipRule="evenodd" d="M9 18C9.55229 18 10 17.5523 10 17V15C10 14.4477 9.55229 14 9 14C8.44772 14 8 14.4477 8 15V17C8 17.5523 8.44772 18 9 18Z" fill="currentColor" />
                              <path fillRule="evenodd" clipRule="evenodd" d="M14 9C14 8.44771 14.4477 8 15 8H17C17.5523 8 18 8.44771 18 9C18 9.55228 17.5523 10 17 10H15C14.4477 10 14 9.55228 14 9Z" fill="currentColor" />
                              <path fillRule="evenodd" clipRule="evenodd" d="M0 9C0 8.44771 0.447715 8 1 8H3C3.55228 8 4 8.44771 4 9C4 9.55228 3.55228 10 3 10H1C0.447715 10 0 9.55228 0 9Z" fill="currentColor" />
                            </g>
                          </svg>
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="header__section header__section--middle">
                  <h1 className="header__logo">
                    <a href="/" className="header__logo-link">
                      <img src="/product_public/logos/image (24).jpg" id="logo_img" style={{ borderRadius: '5px', width: '65px', boxShadow: '0 0 5px 2px #482e6fb8' }} alt="" />
                    </a>
                  </h1>
                </div>
                <div className="header__section header__section--right">
                  <nav className="header__nav visible@md">
                    <ul className="header__list">
                      <li className="header__list-item">
                        <button id="heroinnerBtn" className="header__link">
                          Shop
                        </button>
                      </li>
                      <li className="header__list-item">
                        <a href="https://www.instagram.com/samir_devgenius/" className="header__link">
                          DevStore
                        </a>
                      </li>
                      <li className="header__list-item">
                        <a href="/" className="header__link">
                          Aboute
                        </a>
                      </li>
                      <li className="header__list-item">
                        <a href="/" className="header__link">
                          Home
                        </a>
                      </li>
                    </ul>
                  </nav>
                  <ul className="header__list">
                    <li className="header__list-item">
                      <button id="heroinnerBtn" className="header__icon header__icon--cart">
                        <div data-cart-widget="widget" data-testid="cart.icon" className="cart-widget empty">
                          <span data-cart-widget="quantity" className="cart-widget__items"></span>
                          <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.4868 6.36669V7.16669L14.4877 7.16669L14.4868 6.36669ZM3.50458 6.36669V5.56668L3.50225 5.56669L3.50458 6.36669ZM1.5 6.36672L1.50639 5.56675L0.486056 5.55859L0.721609 6.5514L1.5 6.36672ZM3.7649 14.7659L2.99426 14.9807L3.15735 15.5659H3.7649V14.7659ZM14.2351 14.7659V15.5659H14.8426L15.0057 14.9807L14.2351 14.7659ZM16.5 6.36671L17.2784 6.55139L17.5113 5.56977L16.5024 5.56672L16.5 6.36671ZM14.4868 5.56669H3.50458V7.16669H14.4868V5.56669ZM16.5 6.36671C16.5024 5.56672 16.5024 5.56672 16.5024 5.56672C16.5024 5.56672 16.5024 5.56672 16.5024 5.56672C16.5024 5.56672 16.5023 5.56672 16.5023 5.56672C16.5022 5.56672 16.5021 5.56672 16.502 5.56672C16.5017 5.56672 16.5013 5.56671 16.5007 5.56671C16.4996 5.56671 16.4979 5.5667 16.4958 5.5667C16.4914 5.56669 16.4848 5.56667 16.4759 5.56665C16.4582 5.56661 16.4313 5.56655 16.3944 5.56649C16.3207 5.56636 16.2071 5.5662 16.0475 5.5661C15.7282 5.56589 15.2244 5.56589 14.486 5.56669L14.4877 7.16669C15.2254 7.16589 15.7282 7.16589 16.0464 7.1661C16.2056 7.1662 16.3185 7.16636 16.3916 7.16648C16.4282 7.16655 16.4548 7.1666 16.4722 7.16665C16.4809 7.16667 16.4873 7.16668 16.4915 7.16669C16.4936 7.1667 16.4951 7.1667 16.4961 7.16671C16.4966 7.16671 16.497 7.16671 16.4973 7.16671C16.4974 7.16671 16.4975 7.16671 16.4975 7.16671C16.4975 7.16671 16.4976 7.16671 16.4976 7.16671C16.4976 7.16671 16.4976 7.16671 16.4976 7.16671C16.4976 7.16671 16.4976 7.16671 16.5 6.36671ZM3.50225 5.56669C2.76706 5.56883 2.26715 5.56884 1.95145 5.56832C1.79361 5.56805 1.68185 5.56766 1.60979 5.56733C1.57376 5.56717 1.54766 5.56702 1.5307 5.56691C1.52221 5.56686 1.51601 5.56682 1.51199 5.56679C1.50999 5.56678 1.50852 5.56677 1.50759 5.56676C1.50713 5.56676 1.5068 5.56675 1.5066 5.56675C1.5065 5.56675 1.50643 5.56675 1.5064 5.56675C1.50638 5.56675 1.50637 5.56675 1.50637 5.56675C1.50637 5.56675 1.50638 5.56675 1.50638 5.56675C1.50639 5.56675 1.50639 5.56675 1.5 6.36672C1.49361 7.1667 1.49362 7.1667 1.49363 7.16672C1.49364 7.16672 1.49365 7.16672 1.49367 7.16672C1.4937 7.16672 1.49375 7.16673 1.49382 7.16673C1.49395 7.16673 1.49416 7.16674 1.4945 7.16675C1.49518 7.16676 1.49628 7.16678 1.49801 7.16681C1.50148 7.16686 1.5071 7.16694 1.51563 7.16703C1.53269 7.16722 1.55901 7.16748 1.59502 7.16774C1.66705 7.16826 1.77828 7.1688 1.93511 7.16907C2.2501 7.16962 2.7478 7.16961 3.50225 7.16669L3.50225 5.56669ZM0.721609 6.5514L2.99426 14.9807L4.53554 14.5511L2.27839 6.18203L0.721609 6.5514ZM15.0057 14.9807L17.2784 6.55139L15.7216 6.18203L13.4645 14.5511L15.0057 14.9807ZM3.7649 15.5659H14.2351V13.9659H3.7649V15.5659ZM12.0114 5.56669C11.153 5.56669 10.4401 4.85381 10.4401 3.99542H8.84014C8.84014 5.73549 10.2713 7.16669 12.0114 7.16669V5.56669ZM10.4401 3.99542C10.4401 3.13702 9.72725 2.42414 8.86886 2.42414V4.02414C8.8211 4.02414 8.84014 4.0051 8.84014 3.99542H10.4401ZM8.86886 2.42414C8.01046 2.42414 7.29758 3.13702 7.29758 3.99542H8.89758C8.89758 4.0051 8.87854 4.02414 8.86886 4.02414V2.42414ZM7.29758 3.99542C7.29758 4.85381 6.5847 5.56669 5.72631 5.56669V7.16669C7.46638 7.16669 8.89758 5.73549 8.89758 3.99542H7.29758Z" fill="currentColor" />
                          </svg>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <aside data-drawer="mobile-menu" className="drawer hidden@md">
            <div className="drawer__background" data-drawer-trigger-primary="mobile-menu"></div>
            <div className="drawer__content drawer__content--small mobile-menu" style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <div className="mobile-menu__section mobile-menu__section--header">
                <a href="#" className="mobile-menu__close" data-drawer-trigger-primary="mobile-menu">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.25 18.75L18.75 1.25M18.75 18.75L1.25 1.25" vectorEffect="non-scaling-stroke" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="bevel" />
                  </svg>
                </a>
              </div>
              <div className="mobile-menu__section mobile-menu__section--body">
                <div className="mobile-menu__logo">
                  <a href="/" className="mobile-menu__logo-link" title="Home">
                    <img src="/product_public/logos/image (24).jpg" style={{ borderRadius: '5px', width: '65px', boxShadow: '0 0 5px 2px #482e6fb8' }} alt="" />
                  </a>
                </div>
                <div className="mobile-menu__nav">
                  {/* navx */}
                  <ul className="mobile-menu__list">
                    <li className="mobile-menu__list-item">
                      <button id="heroinnerBtn" className="header__link">
                        Shop
                      </button>
                    </li>
                    <li className="mobile-menu__list-item">
                      <a href="https://www.instagram.com/samir_devgenius/" className="header__link">
                        DevStore
                      </a>
                    </li>
                    <li className="mobile-menu__list-item">
                      <a href="/" className="header__link">
                        Aboute
                      </a>
                    </li>
                    <li className="mobile-menu__list-item">
                      <a href="/" className="header__link">
                        Home
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mobile-menu__mode-switch">
                <label className="switch">
                  <input data-mode-switch type="checkbox" className="switch__input" />
                  <span className="switch__slider">
                    <span className="switch__icon switch__icon--on">
                      <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.6" d="M15.7784 14.092C13.9975 14.8371 11.9949 14.8411 10.2112 14.1031C8.42736 13.3651 7.00849 11.9455 6.26669 10.1566C5.52488 8.36778 5.5209 6.35619 6.25562 4.56439C6.99035 2.7726 8.40359 1.34736 10.1844 0.60223V0.60223C10.4474 0.475882 10.4207 0.135018 10.1322 0.0912969C8.60008 -0.1409 7.02724 0.0711922 5.60216 0.711822C4.50177 1.15537 3.50037 1.81468 2.65643 2.65125C1.8125 3.48782 1.14294 4.4849 0.686847 5.58426C0.230755 6.68362 -0.00273027 7.86324 2.40878e-05 9.05424C0.00277844 10.2452 0.241717 11.4238 0.702889 12.521C1.16406 13.6182 1.83823 14.6121 2.68602 15.4448C3.53382 16.2774 4.53825 16.932 5.64068 17.3704C6.74311 17.8088 7.92145 18.0222 9.10689 17.9982C10.2923 17.9741 11.4611 17.7131 12.545 17.2303C13.984 16.651 15.2262 15.6842 16.1415 14.4471C16.2939 14.241 16.0064 13.9748 15.7784 14.092V14.092Z" fill="currentColor" />
                      </svg>
                    </span>
                    <span className="switch__icon switch__icon--off">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <path d="M13 8.99999C13 11.2091 11.2091 13 8.99999 13C6.79085 13 4.99999 11.2091 4.99999 8.99999C4.99999 6.79085 6.79085 4.99999 8.99999 4.99999C11.2091 4.99999 13 6.79085 13 8.99999Z" fill="currentColor" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M12.7929 5.29288C12.4024 4.90236 12.4024 4.26919 12.7929 3.87867L14.2071 2.46446C14.5976 2.07393 15.2308 2.07393 15.6213 2.46446C16.0118 2.85498 16.0118 3.48814 15.6213 3.87867L14.2071 5.29288C13.8166 5.68341 13.1834 5.68341 12.7929 5.29288Z" fill="currentColor" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M5.20711 5.29288C5.59763 4.90236 5.59763 4.26919 5.20711 3.87867L3.79289 2.46446C3.40237 2.07393 2.7692 2.07393 2.37868 2.46446C1.98816 2.85498 1.98816 3.48814 2.37868 3.87867L3.79289 5.29288C4.18342 5.68341 4.81658 5.68341 5.20711 5.29288Z" fill="currentColor" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M9 0C9.55229 0 10 0.447715 10 1V3C10 3.55228 9.55229 4 9 4C8.44772 4 8 3.55228 8 3V1C8 0.447715 8.44772 0 9 0Z" fill="currentColor" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M12.7929 12.7071C12.4024 13.0976 12.4024 13.7308 12.7929 14.1213L14.2071 15.5355C14.5976 15.9261 15.2308 15.9261 15.6213 15.5355C16.0118 15.145 16.0118 14.5119 15.6213 14.1213L14.2071 12.7071C13.8166 12.3166 13.1834 12.3166 12.7929 12.7071Z" fill="currentColor" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M5.20711 12.7071C5.59763 13.0976 5.59763 13.7308 5.20711 14.1213L3.79289 15.5355C3.40237 15.9261 2.7692 15.9261 2.37868 15.5355C1.98816 15.145 1.98816 14.5119 2.37868 14.1213L3.79289 12.7071C4.18342 12.3166 4.81658 12.3166 5.20711 12.7071Z" fill="currentColor" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M9 18C9.55229 18 10 17.5523 10 17V15C10 14.4477 9.55229 14 9 14C8.44772 14 8 14.4477 8 15V17C8 17.5523 8.44772 18 9 18Z" fill="currentColor" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M14 9C14 8.44771 14.4477 8 15 8H17C17.5523 8 18 8.44771 18 9C18 9.55228 17.5523 10 17 10H15C14.4477 10 14 9.55228 14 9Z" fill="currentColor" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M0 9C0 8.44771 0.447715 8 1 8H3C3.55228 8 4 8.44771 4 9C4 9.55228 3.55228 10 3 10H1C0.447715 10 0 9.55228 0 9Z" fill="currentColor" />
                        </g>
                      </svg>
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </aside>
        </div>
      </header>
      <div className="page__main">
        <div className="main">
          <div data-testid="main.sections" className="main__sections">
            <div id="fw-section-hero-video-with-multiple-buttons-1700666646" className="fw-section">
              <section data-section-id="fw-section-hero-video-with-multiple-buttons-1700666646" data-testid="main.single.section" className="hero hero--multiple-buttons hero--fw-section-hero-video-with-multiple-buttons-1700666646 hero--move-top">
                <div className="section-background">
                  <video id="background-video" playsInline muted loop className="section-background__video">
                    <source src="https://storage.googleapis.com/popshopprod-shop-renderer-assets-q9gk7sc6/themes/assets/74253f59-c16d-4728-9ad6-803da8ffdc5e/assets/hero-video-with-multiple-buttons-1700666646-video-ab4ceb1e95742187fe677bf9070cf092638955e28eec6d5b87a3db7455d9948b.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="hero__inner" id="hero__inner">
                  <div className="container wrapper">
                    <div className="hero__content hero__content--center hero__content--large">
                      <h1 id="animate-heading" className="hero__heading hero__heading--extra-large">
                        Your One-Stop Shop for Quality Products at Great Prices
                      </h1>
                      <div className="hero__cta-container hero__cta-container--center">
                        <div className="hero__cta" id="heroinnerBtn_v2">
                          <button id="heroinnerBtn_v2" className="button button--primary button--mobile-expand">
                            DevStore merch
                          </button>
                        </div>
                        <div className="hero__cta">
                          <a href="https://www.instagram.com/samir_devgenius/" target="_blank" className="button button--secondary button--mobile-expand">
                            <span className="button__icon button__icon--align">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                                <linearGradient id="a" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse">
                                  <stop offset="0" stopColor="#f58529" />
                                  <stop offset=".507" stopColor="#dd2a7b" />
                                  <stop offset=".99" stopColor="#8134af" />
                                </linearGradient>
                                <path fill="url(#a)" d="M34.5 0h-21A13.5 13.5 0 0 0 0 13.5v21C0 41.56 6.44 48 13.5 48h21c7.06 0 13.5-6.44 13.5-13.5v-21C48 6.44 41.56 0 34.5 0z" />
                                <path fill="#FFF" d="M24 12a12 12 0 1 0 12 12 12.013 12.013 0 0 0-12-12zm0 19.5A7.5 7.5 0 1 1 31.5 24 7.508 7.508 0 0 1 24 31.5zM37.5 10.2a2.7 2.7 0 1 0 2.7 2.7 2.702 2.702 0 0 0-2.7-2.7z" />
                              </svg>
                            </span>
                            Instagram
                          </a>
                        </div>
                        <div className="hero__cta">
                          <a href="https://wa.me/21207187106" target="_blank" className="button button--secondary button--mobile-expand">
                            <span className="button__icon button__icon--align">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                                <path fill="#25D366" d="M4.28 43.25L7.66 30.67c-1.82-3.1-2.67-6.69-2.66-10.34.02-10.62 8.64-19.24 19.27-19.25 5.14 0 9.91 1.99 13.51 5.59 3.6 3.6 5.58 8.37 5.58 13.51-.01 10.63-8.64 19.25-19.26 19.25-3.45 0-6.81-.91-9.74-2.64L4.28 43.25z" />
                                <path fill="#FFF" d="M15.33 14.41c-.37-.83-.76-.85-1.11-.87h-.93c-.35 0-.92.13-1.41.62-.48.49-1.85 1.81-1.85 4.41 0 2.6 1.89 5.11 2.16 5.46.26.35 3.7 5.93 9.11 8.06 4.51 1.78 5.42 1.42 6.39 1.33.97-.09 3.12-1.27 3.55-2.5.43-1.23.43-2.3.3-2.5-.13-.2-.48-.35-1.01-.61-.52-.26-3.12-1.54-3.6-1.71-.48-.17-.82-.26-1.17.26-.35.52-1.35 1.71-1.66 2.06-.3.35-.61.39-1.13.13-.52-.26-2.19-.81-4.16-2.58-1.54-1.37-2.59-3.06-2.9-3.58-.3-.52-.03-.81.22-1.06.23-.23.52-.61.77-.91.26-.3.35-.52.52-.87.17-.35.09-.65-.04-.91-.12-.26-1.03-2.49-1.44-3.43z" />
                              </svg>
                            </span>
                            Whatsapp
                          </a>
                        </div>
                        <div className="hero__cta">
                          <a href="https://web.facebook.com/profile.php?id=100022274520025" target="_blank" className="button button--secondary button--mobile-expand">
                            <span className="button__icon button__icon--align">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                                <path fill="#1877F2" d="M24 0C10.74 0 0 10.74 0 24c0 11.85 8.61 21.63 19.88 23.74V31H14.17v-7h5.71v-5.36c0-5.63 3.33-8.74 8.44-8.74 2.45 0 5.02.44 5.02.44v5.53h-2.83c-2.79 0-3.65 1.73-3.65 3.5V24h6.21l-1 7h-5.21v16.74C39.39 45.63 48 35.85 48 24 48 10.74 37.26 0 24 0z" />
                                <path fill="#FFF" d="M33.67 31l1-7h-6.21v-4.14c0-1.77.87-3.5 3.65-3.5h2.83v-5.53s-2.57-.44-5.02-.44c-5.11 0-8.44 3.11-8.44 8.74V24h-5.71v7h5.71v16.74c1.85.3 3.75.46 5.71.46s3.86-.16 5.71-.46V31h5.21z" />
                              </svg>
                            </span>
                            Facebook
                          </a>
                        </div>
                        <div className="hero__cta">
                          <a href="https://x.com/Samir_Germany1" target="_blank" className="button button--secondary button--mobile-expand">
                            <span className="button__icon button__icon--align">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                                <path fill="#1DA1F2" d="M24 0C10.74 0 0 10.74 0 24c0 13.26 10.74 24 24 24s24-10.74 24-24C48 10.74 37.26 0 24 0z" />
                                <path fill="#FFF" d="M37.67 15.43c-1.03.46-2.13.78-3.28.92a5.65 5.65 0 0 0 2.47-3.12 11.26 11.26 0 0 1-3.57 1.36 5.62 5.62 0 0 0-9.57 5.12 15.93 15.93 0 0 1-11.56-5.86 5.62 5.62 0 0 0 1.74 7.51 5.6 5.6 0 0 1-2.55-.71v.07a5.62 5.62 0 0 0 4.51 5.5 5.64 5.64 0 0 1-2.54.1 5.63 5.63 0 0 0 5.26 3.91A11.28 11.28 0 0 1 9 35.33a15.91 15.91 0 0 0 8.62 2.53c10.35 0 16-8.57 16-16 0-.24-.01-.49-.02-.73a11.44 11.44 0 0 0 2.8-2.9z" />
                              </svg>
                            </span>
                            Twitter
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div id="fw-section-featured-collection-0" className="fw-section">
              <section data-section-id="fw-section-featured-collection-0" data-testid="main.single.section" className="featured-collection featured-collection--fw-section-featured-collection-0">
                <div className="collection">
                  <div className="section-background"></div>
                  <div className="collection__inner">
                    <div className="container wrapper">
                      <div className="collection__grid">
                        <div className="grid grid--gapless grid--center">
                          <div className="grid__column grid__column--6 grid__column--3@md">
                            <div data-testid="product" className="product-tile">
                              <a href="" className="tile">
                                <div className="tile__plus-icons">
                                  <div className="tile__plus-icon tile__plus-icon--top-left">
                                    <svg className="plus-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M6 0V12M12 5.8125H0H12Z" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                  </div>
                                  <div className="tile__plus-icon tile__plus-icon--top-right">
                                    <svg className="plus-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M6 0V12M12 5.8125H0H12Z" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                  </div>
                                  <div className="tile__plus-icon tile__plus-icon--bottom-left">
                                    <svg className="plus-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M6 0V12M12 5.8125H0H12Z" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                  </div>
                                  <div className="tile__plus-icon tile__plus-icon--bottom-right">
                                    <svg className="plus-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M6 0V12M12 5.8125H0H12Z" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                  </div>
                                </div>
                                <div className="tile__wrapper">
                                  <div className="tile__inner">
                                    <div className="tile__image">
                                      <div className="image image--background-color">
                                        <div className="image__badges">
                                        </div>
                                        <div className="image__object">
                                          <picture>
                                            <source srcSet="/product_public/imgs_porducts/promo/porduct_01.jpg" />
                                            <img src="/product_public/imgs_porducts/promo/porduct_01.jpg" width="4000" height="4000" alt="Product image" />
                                          </picture>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="tile__description">
                                      <h3 className="tile__heading">
                                        8-Bit Drip
                                      </h3>
                                      <div className="tile__prices-container">
                                        <div className="tile__price">
                                          $75.00
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          {/* ... more products ... */}
                        </div>
                      </div>
                      <div className="collection__cta">
                        <button id="heroinnerBtn" className="button button--primary">
                          Browse all products
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div id="fw-section-recent-videos-1700666589" className="fw-section">
              <section data-section-id="fw-section-recent-videos-1700666589" data-testid="main.single.section" className="recent-videos recent-videos--fw-section-recent-videos-1700666589">
                <div className="container wrapper">
                  <div className="recent-videos__header">
                    <div className="section-header">
                      <h2 className="section-header__heading section-header__heading--left">Recent Products
                      </h2>
                    </div>
                  </div>
                  <div className="recent-videos__grid-container">
                    <div className="recent-videos__grid">
                      <div className="grid grid--gapless">
                        <div className="grid__column grid__column--12 grid__column--4@md">
                          <div className="video-tile">
                            <a href="" target="_blank" className="video-tile__link">
                              <div className="video-tile__plus-icons">
                                <div className="video-tile__plus-icon video-tile__plus-icon--top-left">
                                  <svg className="plus-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 0V12M12 5.8125H0H12Z" stroke="currentColor" strokeWidth="2" />
                                  </svg>
                                </div>
                                <div className="video-tile__plus-icon video-tile__plus-icon--top-right">
                                  <svg className="plus-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 0V12M12 5.8125H0H12Z" stroke="currentColor" strokeWidth="2" />
                                  </svg>
                                </div>
                                <div className="video-tile__plus-icon video-tile__plus-icon--bottom-left">
                                  <svg className="plus-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 0V12M12 5.8125H0H12Z" stroke="currentColor" strokeWidth="2" />
                                  </svg>
                                </div>
                                <div className="video-tile__plus-icon video-tile__plus-icon--bottom-right">
                                  <svg className="plus-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 0V12M12 5.8125H0H12Z" stroke="currentColor" strokeWidth="2" />
                                  </svg>
                                </div>
                              </div>
                              <div className="video-tile__wrapper">
                                <div className="video-tile__image-container">
                                  <div className="video-tile__image">
                                    <div className="image image--video-thumbnail">
                                      <div className="image__object image__object--video">
                                        <img src="/product_public/imgs_porducts/promo/porduct_03.jpg" alt="Samsung Galaxy S25/Ultra Impressions: What Happened?" className="image__image" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="video-tile__image-overlay"></div>
                                  <div className="video-tile__icon">
                                    <img src="/product_public/imgs_porducts/promo/porduct_03.jpg" alt="Watch video" className="video-tile__icon-image" />
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        {/* ... more videos ... */}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <footer className="page__footer">
        <div id="fw-section-footer" className="fw-section">
          <div data-testid="main.single.section" className="footer">
            <div className="marquee__container" data-marquee>
              <div className="marquee__label" style={{ userSelect: 'none', textShadow: '0 12px 5px #482e6fb8' }}>
                DevStore
                DevStore
                DevStore
                DevStore
                DevStore
                DevStore
              </div>
            </div>
            <div className="container wrapper">
              <div className="footer__inner">
                <div className="footer__logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <a href="/" className="footer__logo-link">
                    <img src="/product_public/logo/logo.jpeg" style={{ borderRadius: '50%', width: '50px' }} alt="" />
                  </a>
                </div>
                <div className="footer__socials">
                  <ul className="footer__list footer__list--socials">
                    <li className="footer__list-item footer__list-item--social">
                      <a href="https://github.com/samir20-23" target="_blank" className="footer__social-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                          <path fill="#181616" d="M24 .5C10.85.5.5 10.85.5 24c0 10.4 6.73 19.2 16.05 22.3 1.17.22 1.6-.51 1.6-1.13 0-.56-.02-2.05-.03-4.03-6.53 1.42-7.91-3.15-7.91-3.15-1.06-2.7-2.6-3.42-2.6-3.42-2.13-1.45.16-1.42.16-1.42 2.36.16 3.61 2.43 3.61 2.43 2.1 3.6 5.52 2.56 6.87 1.95.21-1.52.82-2.57 1.49-3.16-5.21-.59-10.69-2.6-10.69-11.59 0-2.56.92-4.65 2.43-6.29-.25-.59-1.05-2.95.23-6.15 0 0 1.97-.63 6.45 2.4 1.87-.52 3.87-.78 5.86-.79 1.99.01 3.99.27 5.86.79 4.47-3.03 6.44-2.4 6.44-2.4 1.29 3.2.49 5.56.24 6.15 1.51 1.64 2.43 3.73 2.43 6.29 0 8.99-5.49 10.99-10.72 11.58.84.73 1.59 2.16 1.59 4.36 0 3.15-.03 5.7-.03 6.48 0 .62.43 1.36 1.61 1.13C41.27 43.2 48 34.4 48 24 48 10.85 37.15.5 24 .5z" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}