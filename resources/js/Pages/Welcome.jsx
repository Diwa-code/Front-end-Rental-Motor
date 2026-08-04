import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

// Import semua komponen yang sudah dipisah
import { HeroSection } from '@/Components/LandingPage/HeroSection';
import { BookingBar } from '@/Components/LandingPage/BookingBar';
import { OurStory } from '@/Components/LandingPage/OurStory';
import { OurMission } from '@/Components/LandingPage/OurMission';
import { OurFleet } from '@/Components/LandingPage/OurFleet';
import { CallToAction } from '@/Components/LandingPage/CallToAction';

export default function Welcome({ auth, motors }) {
    return (
        <PublicLayout auth={auth}>
            <Head title="BALI RIDE – Explore Bali on Two Wheels" />

            <HeroSection />
            <BookingBar />

            {/* Our Story, Mission, dll dirangkai di bawahnya */}
            <OurStory />
            <OurMission />
            <OurFleet motors={motors} />
            <CallToAction />

        </PublicLayout>
    );
}