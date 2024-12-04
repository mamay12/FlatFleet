import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import "../styles/_onboarding.sass"

import 'swiper/css';
import 'swiper/css/pagination';
import { FolderViewOutlined } from '@ant-design/icons';

const OnboardingPage: React.FC = () => {
    return (
        <div className="onboarding">
            <Swiper
                className="onboarding-swiper"
                modules={[Pagination]}
                spaceBetween={40}
                slidesPerView={1}
                pagination={{ clickable: true }}
            >
                <SwiperSlide className='slide-content'>
                    <div className='round-img-wrapper'>
                        <div className='round-img'>
                            <img src="https://images.unsplash.com/photo-1732559797723-4af87682e682?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        <div className='icon'>
                            <FolderViewOutlined style={{
                                color: "white",
                                fontSize: 52
                            }} />
                        </div>
                    </div>
                    <h2>Manage your home easily</h2>
                    <p>Lorem ipsum dolor sit amet consectetur. Mi enim dignissim vitae quam quis fringilla</p>
                </SwiperSlide>
                <SwiperSlide className='slide-content'>
                    <div className='round-img-wrapper'>
                        <div className='round-img'>
                            <img src="https://images.unsplash.com/photo-1733028724656-b456573528ee?q=80&w=2681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        <div className='icon'>
                            <FolderViewOutlined style={{
                                color: "white",
                                fontSize: 52
                            }} />
                        </div>
                    </div>
                    <h2>Manage your home easily</h2>
                    <p>Lorem ipsum dolor sit amet consectetur. Mi enim dignissim vitae quam quis fringilla</p>
                </SwiperSlide>
            </Swiper>
            <button className="get-started-btn">Get started</button>
        </div>
    );
};

export default OnboardingPage; 