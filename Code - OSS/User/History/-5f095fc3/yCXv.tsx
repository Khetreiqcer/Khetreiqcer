'use client';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import Modal from '@/components/Modal';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import BenefitSection from '@/components/BenefitSection';
import Features from '@/components/Features';

export default function Home() {
  const user = useContext(AuthContext);

  return (
    <div>
      <Hero />
      <BenefitSection />
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Quer saber mais?</h2>
        <Modal />
      </section>

      {user ? (
        <>
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Bem-vindo de volta!
            </h2>
            <p className="text-center">
              Aqui estão suas recomendações personalizadas e atividades
              recentes.
            </p>
          </section>
        </>
      ) : (
        <>
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-semibold text-center mb-12">
              O que nossos usuários dizem
            </h2>
            <TestimonialCarousel />
          </section>
        </>
      )}

      <Features />
      <Footer />
    </div>
  );
}
