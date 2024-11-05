'use client';

import Slider from 'react-slick';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react';

export default function TestimonialCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    appendDots: (dots: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined) => (
      <div>
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    customPaging: (i: any) => (
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#ddd',
          margin: '0 4px',
          cursor: 'pointer',
        }}
      />
    ),
  };

  const testimonials = [
    {
      name: 'João Silva',
      image:
        'https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      text: 'A Meditação Moderna transformou minha vida. Agora me sinto mais calmo e centrado.',
    },
    {
      name: 'Maria Oliveira',
      image:
        'https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      text: 'As técnicas são fáceis de seguir e realmente ajudam no dia a dia.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="max-w-2xl mx-auto py-12"
    >
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="text-center px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={100}
              height={100}
              className="mx-auto rounded-full mb-4 border-4 border-gray-300 dark:border-gray-600"
            />
            <p className="text-gray-600 dark:text-gray-400 italic mb-4">
              {testimonial.text}
            </p>
            <p className="text-lg text-primary dark:text-secondary font-bold">
              {testimonial.name}
            </p>
          </motion.div>
        ))}
      </Slider>
    </motion.div>
  );
}
