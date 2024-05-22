import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { toast } from 'react-toastify';
import ImageGallery from 'react-image-gallery';
import 'react-toastify/dist/ReactToastify.css';
import playThumbYt from '../images/29MD.jpg';
import backgroundVideo from '../images/backgroundVideo.mp4';
// import bgvid from '../images/bgvid.mp4'

import './Home.scss';
import './Home.mobile.scss';
import './ButtonAnimation.scss';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import ReactPlayer from 'react-player';

toast.configure();

export const Home = () => {
    useEffect(() => {
        let screenSize = window.screen.width
        console.log(screenSize)
        const threshold = 0
        let lastScrollY = window.pageYOffset
        let ticking = false

        const updateScrollDir = () => {
            const scrollY = window.pageYOffset
            let sideBtn = document.querySelector('#side-btn')

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false
                return
            }

            if (scrollY !== 0) {
                sideBtn.className =
                    'nk-side-buttons nk-side-buttons-visible nk-side-buttons-show-scroll-top'
            } else {
                sideBtn.className = 'nk-side-buttons nk-side-buttons-visible'
            }
            lastScrollY = scrollY > 0 ? scrollY : 0
            ticking = false
        }

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir)
                ticking = true
            }
        }

        window.addEventListener('scroll', onScroll)

        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const images = [
        {
            original: '/images/1MD.jpg',
            thumbnail: ''
        },
        {
            original: '/images/14MD.jpg',
            thumbnail: ''
        },
        {
            original: '/images/20MD.jpg',
            thumbnail: ''
        },
        {
            original: '/images/27MD.jpg',
            thumbnail: ''
        },
        {
            original: '/images/29MD.jpg',
            thumbnail: ''
        },
        {
            original: '/images/30MD.jpg',
            thumbnail: ''
        },
        {
            original: '/images/32MD.jpg',
            thumbnail: ''
        },
        {
            original: '/images/33MD.jpg',
            thumbnail: ''
        },
        {
            original: '/images/6MD.jpg',
            thumbnail: ''
        },
        {
            original: '/images/9MD.jpg',
            thumbnail: ''
        },
        {
            original: '/images/24MD.jpg',
            thumbnail: ''
        }
    ];

    useEffect(() => {
        const up = document.querySelector('.volumeUp');
        const off = document.querySelector('.volumeOff');
        up.style.display = 'block';
        off.style.display = 'none';
    });

    function onVolumeHandler () {
        const up = document.querySelector('.volumeUp');
        const off = document.querySelector('.volumeOff');
        if (up.style.display === 'block') {
            off.style.display = 'block';
            up.style.display = 'none';
            // setVolumeStatus(false);
        } else if (up.style.display !== 'block') {
            up.style.display = 'block';
            off.style.display = 'none';
        }
    }

    return (
        <div>
            <div className='nk-header-title nk-header-title-lg nk-header-title-parallax nk-header-title-parallax-opacity'>
                <video autoPlay loop muted poster='' id='videoVideobgstatic'>
                    <source src='http://exo-universe.io/game/assets/images/bg-vid.mp4' type='video/mp4' />
                </video>
                <video autoPlay loop muted poster='' id='videoVideobg'>
                    <source src={backgroundVideo} type='video/mp4' />
                </video>
                <div className='nk-header-table'>
                    <div className='nk-header-table-cell'>
                        <div className='container'>
                            <div className='nk-header-text'>
                                <h1 className='nk-title display-3'>
                                    Exodus: Our Universe
                                </h1>
                                <div className='nk-gap-2 button-container'></div>
                                <a
                                    href='/#'
                                    target='_blank'
                                    className='draw-outline draw-outline--tandem'
                                >
                                    <span>WhitePaper</span>
                                </a>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <a
                                    href='/#'
                                    className='draw-outline draw-outline--tandem'
                                >
                                    <span>NFT Purchase</span>
                                </a>
                                <div className='nk-gap-4'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mnt-80 container'>
                    <div
                        id='rev_slider_50_1_wrapper'
                        className='rev_slider_wrapper fullscreen-container'
                        data-alias='photography-carousel48'
                        style={{ padding: '0px' }}
                    >
                        <ImageGallery lazyLoad={true} originalWidth='90%' originalHeight='90%' items={images} />
                    </div>
                </div>
                <div className='container'>
                    <div className='nk-gap-6'></div>
                    <div className='nk-gap-2'></div>
                    <div className='row vertical-gap lg-gap'>
                        <div className='col-md-4'>
                            <div className='nk-ibox'>
                                <div className='nk-ibox-icon nk-ibox-icon-circle'>
                                    <span>
                                        <SportsEsportsIcon fontSize='larger' />
                                    </span>
                                </div>
                                <div className='nk-ibox-cont'>
                                    <h2 className='nk-ibox-title'>
                                        Gameplay the way you like
                                    </h2>
                                    Accommodating players of all types, from the
                                    battle-hungry and over-achievers to the
                                    social butterflies and brave explorers.
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='nk-ibox'>
                                <div className='nk-ibox-icon nk-ibox-icon-circle'>
                                    <span>
                                        <LocalFireDepartmentIcon fontSize='larger' />
                                    </span>
                                </div>
                                <div className='nk-ibox-cont'>
                                    <h2 className='nk-ibox-title'>
                                        More than just a Metaverse
                                    </h2>
                                    Exodus: Our Universe allows players to form
                                    and join alliances, establish bases and wage
                                    wars against wily foes. Meanwhile, they can
                                    enjoy battle-themed manufacturing, rental
                                    and purchasing features. Players can mine
                                    and process different materials to enable
                                    crafting and further research to earn the
                                    in-game currencies.
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='nk-ibox'>
                                <div className='nk-ibox-icon nk-ibox-icon-circle'>
                                    <span>
                                        <MilitaryTechIcon fontSize='larger' />
                                    </span>
                                </div>
                                <div className='nk-ibox-cont'>
                                    <h2 className='nk-ibox-title'>
                                        Over 150+ Unique NFTS
                                    </h2>
                                    Apart from being the biggest Metaverse,
                                    Exodus has over 150 unique NFTs, spanning
                                    from over 50 Spaceship, over 30 standard
                                    buildings, over 20 unique diffences, and a
                                    ever growing asset base, Exodus: Our
                                    Universe has no comparison.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='nk-gap-2'></div>
                    <div className='nk-gap-6'></div>
                </div>
                <div className='container-about text-center'>
                    <div className='nk-gap-6'></div>
                    <div className='nk-gap-2'></div>
                    <h2 className='nk-title h1 textCenter'>
                        About Exodus: Our Universe
                    </h2>
                    <div className='nk-gap-3 textCenter'></div>

                    <p className='lead' style={{ textAlign: 'left' }}>
                        Exodus: Our Universe is a hyper-real experience in which
                        members can socialize, play games and much more in the
                        great beyond of outer space.
                        <br />
                        <br />
                        The plots of land within Exodus: Our Universe bring with
                        them many possibilities. Members who wish to own land
                        will have the option to purchase one-acre plots. They
                        will be able to combine these plots with neighboring
                        land to advance their capabilities, establish production
                        facilities and build new structures on their land. They
                        can also modify existing structures and grow plants in
                        order to further unlock their land’s potential.
                        Likewise, they can produce items and offer them for rent
                        or sale in the Universe’s central marketplace.
                        <br />
                        <br />
                        Further pairing profitability and entertainment, Exodus:
                        Our Universe allows players to form and join alliances,
                        establish bases and wage wars against wily foes.
                        Meanwhile, they can enjoy battle-themed manufacturing,
                        rental and purchasing features. Players can mine and
                        process different materials to enable crafting and
                        further research to earn the in-game currencies.
                        <br />
                        <br />
                        Accommodating players of all types, from the
                        battle-hungry and over-achievers to the social
                        butterflies and brave explorers, members can use various
                        crypto currencies on the planets and in future games
                        that fall within Exodus: Our Universe.
                        <br />
                        <br />
                        Taking Web 2.0 to the next level—to the uncharted
                        territory of Web 3D—Exodus: Our Universe has been
                        created with Unreal Engine 5 technology, boasting
                        true-to-life lighting and shadows with Lumen and robust
                        universes with Nanite technology. Further enriching the
                        immersive experience, the MetaHuman feature, will give
                        players the chance to see themselves in the metaverse.
                        With facial scanning software, they will be able to
                        create a 3D avatar with life-like scale and quality.
                    </p>

                    <div className='nk-gap-2'></div>
                    <div className='row no-gutters'>
                        <div className='col-md-4'>
                            <div className='nk-box-2 nk-box-line'>
                                <div className='nk-counter-3'>
                                    <div className='nk-count'>58</div>
                                    <h3 className='nk-counter-title h4'>
                                        Unique Ships
                                    </h3>
                                    <div className='nk-gap-1'></div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='nk-box-2 nk-box-line'>
                                <div className='nk-counter-3'>
                                    <div className='nk-count'>10+</div>
                                    <h3 className='nk-counter-title h4'>
                                        Epic Games
                                    </h3>
                                    <div className='nk-gap-1'></div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='nk-box-2 nk-box-line'>
                                <div className='nk-counter-3'>
                                    <div className='nk-count'>6</div>
                                    <h3 className='nk-counter-title h4'>
                                        Planet Types
                                    </h3>
                                    <div className='nk-gap-1'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='nk-gap-2'></div>
                    <div className='nk-gap-6'></div>
                </div>
                <div className='container'>
                    <div className='nk-gap-6'></div>
                    <div className='nk-gap-6'></div>
                    <div className='nk-gap-6'></div>
                    <div className='player-div'>
                        <div className='nk-gap-2'></div>
                        <div className='nk-gap-6'></div>
                        <ReactPlayer
                            url='https://www.youtube.com/watch?v=PMKZELd3l20'
                            light={playThumbYt}
                            width='100%'
                        />
                    </div>
                    <div className='nk-gap-2'></div>
                    <div className='nk-gap-6'></div>
                    <div className='nk-gap-2'></div>
                    <div className='nk-gap-6'></div>
                </div>
            </div>

            <div className='nk-box bg-dark-1 text-center'>
                <div className='nk-gap-6'></div>
                <div className='nk-gap-2'></div>
                <div className='bg-image op-3'>
                    <img
                        src='/images/14MD.jpg'
                        alt=''
                        className='jarallax-img'
                    />
                </div>
                <div className='container'>
                    <h2 className='display-4'>This Is Our Universe</h2>
                    <div className='nk-gap'></div>
                    <div>You don't get to be great without a battle...</div>
                    <div className='nk-gap-4'></div>

                    <div
                        className='nk-countdown'
                        data-end='2022-10-21 08:00'
                        data-timezone='EST'
                    ></div>
                </div>
                <div className='nk-gap-2'></div>
                <div className='nk-gap-6'></div>
            </div>
            <div className='nk-gap-2'></div>
            <div className='nk-gap-6'></div>
            <div>
                <Carousel>
                    <Carousel.Item>
                        <div className='corousel-items'>
                            <blockquote className='nk-testimonial-2'>
                                <div
                                    className='nk-testimonial-photo'
                                    style={{
                                        backgroundImage: "url('/images/T1.jpg')"
                                    }}
                                ></div>
                                <div className='nk-testimonial-body'>
                                    <em></em>
                                </div>
                                <div className='nk-testimonial-name h4'>
                                    Lizzi A.
                                </div>
                                <div className='nk-testimonial-source'>
                                    Director of Marketing & Relations
                                </div>
                            </blockquote>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='corousel-items'>
                            <blockquote className='nk-testimonial-2'>
                                <div
                                    className='nk-testimonial-photo'
                                    style={{
                                        backgroundImage: "url('/images/T3.jpg')"
                                    }}
                                ></div>
                                <div className='nk-testimonial-body'>
                                    <em></em>
                                </div>
                                <div className='nk-testimonial-name h4'>
                                    Pedram H.
                                </div>
                                <div className='nk-testimonial-source'>
                                    Creative Director & Lead Artist
                                </div>
                            </blockquote>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='corousel-items'>
                            <blockquote className='nk-testimonial-2'>
                                <div
                                    className='nk-testimonial-photo'
                                    style={{
                                        backgroundImage: "url('/images/T2.jpg')"
                                    }}
                                ></div>
                                <div className='nk-testimonial-body'>
                                    <em></em>
                                </div>
                                <div className='nk-testimonial-name h4'>
                                    Tymor D.
                                </div>
                                <div className='nk-testimonial-source'>
                                    Founder & President
                                </div>
                            </blockquote>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='corousel-items'>
                            <blockquote className='nk-testimonial-2'>
                                <div
                                    className='nk-testimonial-photo'
                                    style={{
                                        backgroundImage: "url('/images/T4.jpg')"
                                    }}
                                ></div>
                                <div className='nk-testimonial-body'>
                                    <em></em>
                                </div>
                                <div className='nk-testimonial-name h4'>
                                    Jamye V.
                                </div>
                                <div className='nk-testimonial-source'>
                                    Director of Operations
                                </div>
                            </blockquote>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className='corousel-items'>
                            <blockquote className='nk-testimonial-2'>
                                <div
                                    className='nk-testimonial-photo'
                                    style={{
                                        backgroundImage: "url('/images/T5.jpg')"
                                    }}
                                ></div>
                                <div className='nk-testimonial-body'>
                                    <em></em>
                                </div>
                                <div className='nk-testimonial-name h4'>
                                    Brandon A.
                                </div>
                                <div className='nk-testimonial-source'>
                                    Director of Development
                                </div>
                            </blockquote>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className='corousel-items'>
                            <blockquote className='nk-testimonial-2'>
                                <div
                                    className='nk-testimonial-photo'
                                    style={{
                                        backgroundImage: "url('/images/T6.jpg')"
                                    }}
                                ></div>
                                <div className='nk-testimonial-body'>
                                    <em></em>
                                </div>
                                <div className='nk-testimonial-name h4'>
                                    Eric D.
                                </div>
                                <div className='nk-testimonial-source'>
                                    Director of IT & Securities
                                </div>
                            </blockquote>
                        </div>
                    </Carousel.Item>
                </Carousel>
                <div className='nk-gap-6'></div>
                <div className='nk-gap-2'></div>
            </div>
            <div className='nk-box bg-dark-1'>
                <div className='nk-gap-6'></div>
                <div className='nk-gap-2'></div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 offset-md-2 col-lg-6 offset-lg-3'>
                            <h2 className='nk-title text-center h1'>
                                Subscribe to our Newsletter
                            </h2>
                            <div className='nk-gap-3'></div>

                            <form
                                action=' '
                                method='post'
                                className='nk-mchimp validate'
                                target='_blank'
                            >
                                <div className='input-group'>
                                    <input
                                        type='email'
                                        name='EMAIL'
                                        className='required email form-control'
                                        placeholder='Email *'
                                    />
                                    <a
                                        href='/#'
                                        target='_blank'
                                        style={{ marginLeft: '5px' }}
                                        className='draw-outline draw-outline--tandem'
                                    >
                                        <span>Subscribe</span>
                                    </a>
                                </div>
                                <div className='nk-form-response-success'></div>
                                <div className='nk-form-response-error'></div>
                                <small>
                                    We'll never share your email with anyone
                                    else.
                                </small>
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: '-5000px'
                                    }}
                                    aria-hidden='true'
                                >
                                    <input
                                        type='text'
                                        name='b_d433160c0c43dcf8ecd52402f_7eafafe8f0'
                                        tabIndex='-1'
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='nk-gap-2'></div>
                <div className='nk-gap-6'></div>
                <div className='nk-gap-4'></div>
            </div>

            <footer className='nk-footer nk-footer-parallax nk-footer-parallax-opacity'>
                <img
                    className='nk-footer-top-corner'
                    src='/images/footer-corner.png'
                    alt=''
                />

                <div className='container'>
                    <div className='nk-gap-2'></div>
                    <div className='nk-footer-logos alignLeft'>
                        <a href='https://yoco.finance/ ' target='_blank' rel="noreferrer">
                            <img className='nk-img' src='/images/yologo.png' alt='Yo Coin' width='76' />
                        </a>
                        <a href='https://twitter.com/HappyCatKripto' target='_blank' rel="noreferrer">
                            <img className='nk-img' src='/images/hcc.jpg' alt='Happy Cat Kripto' width='76' />
                        </a>
                        <a href='/#' target='_blank' rel="noreferrer">
                            <img className='nk-img' src='/images/lunc.png' alt='LUNA Classic' width='76' />
                        </a>
                        <a href='/#'>
                            <img className='nk-img' src='/images/footer-logo-18-restricted.png' alt='Restricted 18+' width='160' />
                        </a>
                    </div>
                    <div className='nk-gap'></div>

                    <p className='alignLeft'>
                        &copy; 2022 Exodus: Our Universe. Developed by and in
                        association with Daviski: Saintz Creation Studio Corp.
                        Numéro de société 1428612-0. Exodus: Our universe and
                        related logos are registered trademarks or trademarks of
                        Daviski: Saintz Creation Studio Corp. in Canada and/or
                        other countries. All other trademarks or trade names are
                        the property of their respective owners. All Rights
                        Reserved.
                    </p>

                    <div className='nk-footer-links alignLeft'>
                        <a href='https://exo-universe.io/tos.html' className='link-effect'>
                            Terms of Service
                        </a>{' '}
                        <span>|</span>{' '}
                        <a href='https://exo-universe.io/privacy.html' className='link-effect'>
                            Privacy Policy
                        </a>
                    </div>

                    <div className='nk-gap-4'></div>
                </div>
            </footer>

            <div className='nk-share-buttons nk-share-buttons-left d-none d-md-flex'>
                <ul>
                    <li>
                        <span
                            className='nk-share-icon'
                            title='Share page on Facebook'
                            data-share='facebook'
                        >
                            <span className='icon fa fa-facebook'></span>
                        </span>
                        <span className='nk-share-name'>Facebook</span>
                    </li>
                    <li>
                        <span
                            className='nk-share-icon'
                            title='Share page on Twitter'
                            data-share='twitter'
                        >
                            <span className='icon fa fa-twitter'></span>
                        </span>
                        <span className='nk-share-name'>Twitter</span>
                    </li>
                    <li>
                        <span
                            className='nk-share-icon'
                            title='Share page on Google+'
                            data-share='google-plus'
                        >
                            <span className='icon fa fa-google-plus'></span>
                        </span>
                        <span className='nk-share-name'>Google Plus</span>
                    </li>
                </ul>
            </div>

            <div
                className='nk-side-buttons nk-side-buttons-visible'
                id='side-btn'
            >
                <ul>
                    <li>
                        <a
                            href='https://discord.gg/VDF9G4XW'
                            target='_blank' rel="noreferrer"
                            className='draw-outline draw-outline--tandem'
                        >
                            Keep in Touch
                        </a>
                    </li>
                    <li onClick={onVolumeHandler}>
                        <span className='draw-outline draw-outline-small draw-outline--tandem'>
                            <span className='icon'>
                                <span className='volumeUp'>
                                    <VolumeUpIcon fontSize='smallest' />
                                </span>
                                <span className='volumeOff'>
                                    <VolumeOffIcon fontSize='smallest' />
                                </span>
                            </span>
                        </span>
                    </li>
                    <li>
                        <a
                            href='#top'
                            className='draw-outline draw-outline-small draw-outline--tandem'
                        >
                            <span>
                                <ExpandLessIcon fontSize='smallest' />
                            </span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className='nk-search'>
                <div className='container'>
                    <form action='#'>
                        <fieldset className='form-group nk-search-field'>
                            <input
                                type='text'
                                className='form-control'
                                id='searchInput'
                                placeholder='Search...'
                                name='s'
                            />
                            <label htmlFor='searchInput'>
                                <i className='ion-ios-search'></i>
                            </label>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}
