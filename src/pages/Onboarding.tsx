import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import "../styles/_onboarding.sass"

const OnboardingPage: React.FC = () => {
    const slides = [
        {
            title: "Manage your home easily",
            description: "Lorem ipsum dolor sit amet consectetur. Mi enim dignissim vitae quam quis fringilla",
            image: "/path-to-your-building-image.jpg",
            icon: "folder-icon"
        },
        // Add more slides as needed
    ];

    return (
        <div className="onboarding">
            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className="onboarding-swiper"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="slide-content">
                            <div className="image-container">
                                <img src={slide.image} alt={slide.title} />
                                <div className={`icon ${slide.icon}`} />
                            </div>
                            <h1>{slide.title}</h1>
                            <p>{slide.description}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className="get-started-btn">Get started</button>
        </div>
    );
};

export default OnboardingPage; 