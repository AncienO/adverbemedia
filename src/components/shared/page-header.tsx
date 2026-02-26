'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
    title: string;
    description: string;
    centered?: boolean;
    className?: string;
}

export function PageHeader({ title, description, centered, className }: PageHeaderProps) {
    return (
        <section className={`hero-section page-header w-full !pt-25 sm:pt-20 md:pt-40 pb-6 md:pb-8 bg-white ${className || ''}`}>
            <div className={`w-full px-[2%] md:px-[10%] flex flex-col ${centered ? 'items-center text-center' : 'items-start text-left'}`}>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    /* FORCES OVERRIDE WITH EXCLAMATION MARKS (!) */
                    className={`font-bold tracking-tight mb-6 pt-4 md:pt-6 w-full ${centered ? '!text-center !text-[3rem] !leading-[1.1] md:!text-7xl' : 'text-left text-4xl md:text-7xl'}`}
                    style={{ color: '#E4192B', fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                >
                    {title}
                </motion.h1>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    /* FORCES LINE TO CENTER WITH !mx-auto */
                    className={`hero-partition w-32 h-1 bg-[#E4192B] rounded-full mb-6 ${centered ? '!mx-auto origin-center' : 'ml-0 origin-left'}`}
                />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                    /* FORCES DESCRIPTION TO CENTER WITH ! */
                    className={`text-base text-gray-600 font-bold max-w-3xl ${centered ? '!text-center !mx-auto' : 'text-left'}`}
                >
                    {description}
                </motion.p>

            </div>
        </section>
    );
}

// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';

// interface PageHeaderProps {
//     title: string;
//     description: string;
//     centered?: boolean;
//     className?: string;
// }

// export function PageHeader({ title, description, centered, className }: PageHeaderProps) {
//     return (
//         <section className={`hero-section page-header w-full pt-28 sm:pt-20 md:pt-40 pb-6 md:pb-8 bg-white ${className || ''}`}>
//             <div className={`w-full px-[2%] md:px-[10%] flex flex-col ${centered ? 'items-center text-center' : 'items-start text-left'}`}>

//                 <motion.h1
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, ease: 'easeOut' }}
//                     /* FORCES CENTER AND HUGE SIZE ON MOBILE WHEN CENTERED IS TRUE */
//                     className={`font-bold tracking-tight mb-6 pt-4 md:pt-6 w-full ${centered ? 'text-center text-[5.5rem] leading-[1.1] md:text-7xl' : 'text-left text-4xl md:text-7xl'}`}
//                     style={{ color: '#E4192B', fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
//                 >
//                     {title}
//                 </motion.h1>

//                 <motion.div
//                     initial={{ scaleX: 0 }}
//                     animate={{ scaleX: 1 }}
//                     transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
//                     /* FORCES THE RED LINE TO CENTER */
//                     className={`hero-partition w-32 h-1 bg-[#E4192B] rounded-full mb-6 ${centered ? 'mx-auto origin-center' : 'ml-0 origin-left'}`}
//                 />

//                 <motion.p
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
//                     /* FORCES DESCRIPTION TO CENTER */
//                     className={`text-base text-gray-600 font-bold max-w-3xl ${centered ? 'text-center mx-auto' : 'text-left'}`}
//                 >
//                     {description}
//                 </motion.p>

//             </div>
//         </section>
//     );
// }

// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';

// interface PageHeaderProps {
//     title: string;
//     description: string;
//     centered?: boolean;
//     className?: string;
// }

// export function PageHeader({ title, description, centered, className }: PageHeaderProps) {
//     return (
//         <section className={`hero-section page-header w-full pt-28 sm:pt-20 md:pt-40 pb-6 md:pb-8 bg-white ${className || ''}`}>
//             <div className={`w-full px-[5%] md:px-[10%] flex flex-col ${centered ? 'items-center text-center' : ''}`}>

//                 <motion.h1
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, ease: 'easeOut' }}
//                     className={`text-4xl md:text-7xl font-bold tracking-tight mb-6 pt-4 md:pt-6 ${centered ? 'text-center' : 'text-left'}`}
//                     style={{ color: '#E4192B', fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
//                 >
//                     {title}
//                 </motion.h1>

//                 <motion.div
//                     initial={{ scaleX: 0 }}
//                     animate={{ scaleX: 1 }}
//                     transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
//                     className={`hero-partition w-32 h-1 bg-[#E4192B] rounded-full mb-6 ${centered ? '!mx-auto origin-center' : 'origin-left'}`}
//                 />

//                 <motion.p
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
//                     className={`text-base text-gray-600 font-bold max-w-3xl ${centered ? 'text-center !mx-auto' : 'text-left'}`}
//                 >
//                     {description}
//                 </motion.p>

//             </div>
//         </section>
//     );
// }

// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';

// interface PageHeaderProps {
//     title: string;
//     description: string;
//     centered?: boolean;
//     className?: string;
// }

// export function PageHeader({ title, description, centered, className }: PageHeaderProps) {
//     return (
//         // <section className={`hero-section w-full pt-20 md:pt-40 pb-6 md:pb-8 bg-white ${className || ''}`}>
//         <section className={`hero-section page-header w-full pt-28 sm:pt-20 md:pt-40 pb-6 md:pb-8 bg-white ${className || ''}`}>



//             {/* <div className={`w-full px-[5%] md:px-[10%] flex flex-col ${centered ? 'items-center text-center' : ''}`}> */}
//             <div className={`w-full px-[2%] md:px-[10%] flex flex-col ${centered ? 'items-center text-center' : ''}`}>
//                 <motion.h1
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, ease: 'easeOut' }}
//                     // className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-left"
//                     className="text-4xl md:text-7xl font-bold tracking-tight mb-6 text-left pt-4 md:pt-6"
//                     style={{ color: '#E4192B', fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
//                 >
//                     {title}
//                 </motion.h1>
//                 <motion.div
//                     initial={{ scaleX: 0 }}
//                     animate={{ scaleX: 1 }}
//                     transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
//                     className={`hero-partition w-32 h-1 bg-[#E4192B] rounded-full mb-6 ${centered ? 'mx-auto origin-center' : 'origin-left'}`}
//                 />
//                 <motion.p
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
//                     className="text-base text-gray-600 font-bold max-w-3xl"
//                 >
//                     {description}
//                 </motion.p>
//             </div>
//         </section>
//     );
// }
