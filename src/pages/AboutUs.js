/* eslint-disable indent */
import React, { Component } from 'react'
import NavBar from '../components/droy/NavBar'
import Footer from '../components/droy/Footer'
import { Link } from 'react-router-dom'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import '../styles/about-us.css'

class AboutUs extends Component {
    render () {
        return (
            <main>
                <Parallax ref={ref => (this.parallax = ref)} pages={4.6}>
                    <NavBar />
                    <ParallaxLayer offset={0} speed={0.5} style={{ opacity: 0.8 }}>
                        <img className='home-picture' src='/img/about-home.png' alt='about-home' />
                    </ParallaxLayer>
                    <ParallaxLayer offset={0} speed={0.8} style={{ opacity: 1 }}>
                        <section className='section-home-about'>
                            <h2 className='title-home'>Free Website Builder</h2>
                            <h1 className='subtitle-home'>Create awesome websites! <br /> No coding and free.</h1>
                            <Link className='button-home' to='/login'>Start now</Link>
                        </section>
                    </ParallaxLayer>
                    <ParallaxLayer offset={1} speed={0} style={{ opacity: 1 }}>
                        <h2 className='section-title'>How DROY works?</h2>
                        <div className='icons-container'>
                            <div className='icon-container'>
                                <img className='section-icon' src='/img/start-icons.png' alt='about-home' />
                                <p className='text-section-icon'>Start project</p>
                            </div>
                            <div className='icon-container'>
                                <img className='section-icon' src='/img/web-icons.png' alt='about-home' />
                                <p className='text-section-icon'>Add components</p>
                            </div>
                            <div className='icon-container'>
                                <img className='section-icon' src='/img/edit-icons.png' alt='about-home' />
                                <p className='text-section-icon'>Edit style and content</p>
                            </div>
                            <div className='icon-container'>
                                <img className='section-icon' src='/img/deploy-icons.png' alt='about-home' />
                                <p className='text-section-icon'>Deploy project</p>
                            </div>
                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer offset={1.8} speed={0.8} style={{ opacity: 1 }}>
                        <img className='home-picture' src='/img/section1-image.png' alt='about-home' />
                    </ParallaxLayer>
                    <ParallaxLayer offset={1.9} speed={0.8} style={{ opacity: 1 }}>
                        <div className='section-container-info-right'>
                            <h3 className='title-section-right'>Drag components <br /> to page</h3>
                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer offset={2} speed={0.3} style={{ opacity: 1 }}>
                        <img className='home-picture' src='/img/section2-image.png' alt='about-home' />
                    </ParallaxLayer>
                    <ParallaxLayer offset={2} speed={0.5} style={{ opacity: 1 }}>
                        <div className='section-container-info-left'>
                            <h3 className='title-section-left'>Edit content and <br /> style inline</h3>
                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer offset={2.95} speed={0.7} style={{ opacity: 1 }}>
                        <img className='home-picture' src='/img/section3-image.png' alt='about-home' />
                    </ParallaxLayer>
                    <ParallaxLayer offset={2.95} speed={0.8} style={{ opacity: 1 }}>
                        <div className='section-container-info-right'>
                            <h3 className='title-section-right'>Preview<br />and publish</h3>
                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer offset={3} speed={0.5} style={{ opacity: 1 }}>
                        <section className='section-about'>
                            <h3 className='subtitle-home'>Its easy and simple</h3>
                            <Link className='button-home' to='/login'>Start now</Link>
                        </section>
                    </ParallaxLayer>
                    <ParallaxLayer offset={3.55} speed={0} style={{ opacity: 1 }}>
                        <h2 className='section-title'>What users say</h2>
                        <div className='opinions-container'>
                            <div className='opinion-container'>
                                <h4 className='name-opinion'>Jorge de Juana</h4>
                                <p className='text-section-icon'>Drag and drop blocks and build websites in mere minutes!
                                This is definitely one of the easiest software solution for website building.</p>
                            </div>
                            <div className='opinion-container'>
                                <h4 className='name-opinion'>Edu Carmona</h4>
                                <p className='text-section-icon'>Droy Website Builder looks great, is genuinely easy to use, 
                                and allows you to build stylish and attractive websites with no hassles at all.</p>
                            </div>
                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer offset={4.01} speed={1} style={{ opacity: 1 }}>
                        <Footer />
                    </ParallaxLayer>
                </Parallax>
            </main>
        )
    }
}

export default AboutUs
