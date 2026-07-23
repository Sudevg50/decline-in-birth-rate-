import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

import { supabase } from '../lib/supabase';

type SurveyFormData = {
  name: string;
  age: number;
  district: string;
  area_type: string;
  profession: string;
  profession_other?: string;
  marital_status: string;
  marital_other?: string;
  question1: string;
  question1_other?: string;
  question2: string;
  question2_other?: string;
  question3: string[];
  question4: string;
  question4_other?: string;
  question5: string;
  question6: string[];
  question7: string;
};

export const Survey: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SurveyFormData>({
    defaultValues: {
      question3: [],
      question6: [],
    }
  });

  const profession = watch('profession');
  const maritalStatus = watch('marital_status');
  const q1 = watch('question1');
  const q2 = watch('question2');
  const q4 = watch('question4');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const onSubmit = async (data: SurveyFormData) => {
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('SurveyResponses')
        .insert([
          {
            name: data.name,
            age: data.age,
            district: data.district,
            area_type: data.area_type,
            profession: data.profession,
            profession_other: data.profession_other || null,
            marital_status: data.marital_status,
            marital_other: data.marital_other || null,
            question1: data.question1,
            question1_other: data.question1_other || null,
            question2: data.question2,
            question2_other: data.question2_other || null,
            question3: data.question3,
            question4: data.question4,
            question4_other: data.question4_other || null,
            question5: data.question5,
            question6: data.question6,
            question7: data.question7,
          }
        ]);
        
      if (error) {
        console.error('Supabase error:', error.message);
        // Fallback or show error
      }
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setIsSubmitting(false);
      navigate('/thank-you');
    }
  };

  const handlePrevious = () => {
    if (step === 2) setStep(1);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen animated-bg py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden relative">
      {/* Decorative Orbs */}
      <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-3xl mx-auto glass-panel rounded-2xl shadow-xl overflow-hidden relative z-10 border border-white/40">
        
        {/* Header & Progress */}
        <div className="px-8 py-6 text-slate-800 border-b border-gray-100/50 bg-white/40 backdrop-blur-md">
          <h2 className="text-2xl font-bold tracking-tight">{t.landingTitle}</h2>
          <div className="mt-4 flex items-center justify-between text-sm font-medium text-slate-500">
            <span>{step === 1 ? t.page1of2 : t.page2of2}</span>
            <span>{step === 1 ? '50%' : '100%'}</span>
          </div>
          <div className="w-full bg-slate-200/50 rounded-full h-1.5 mt-2 overflow-hidden shadow-inner">
            <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-1.5 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: step === 1 ? '50%' : '100%' }}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ duration: 0.3 }}>
                <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">{t.personalInfo}</h3>
                
                <div className="grid grid-cols-1 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.name} *</label>
                    <input type="text" {...register('name', { required: t.required })} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow" />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.age} *</label>
                    <input type="number" {...register('age', { 
                      required: t.required,
                      min: { value: 18, message: t.ageMinError },
                      max: { value: 100, message: t.ageMaxError },
                      valueAsNumber: true
                    })} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none transition-shadow" />
                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
                  </div>

                  {/* District */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.district} *</label>
                    <select {...register('district', { required: t.required })} className="w-full border border-gray-300 rounded-lg px-4 py-2 glass-input focus:ring-2 focus:ring-green-500 outline-none">
                      <option value="">{t.selectDistrict}</option>
                      {['Kasaragod', 'Kannur', 'Wayanad', 'Kozhikode', 'Malappuram', 'Palakkad', 'Thrissur', 'Ernakulam', 'Idukki', 'Kottayam', 'Alappuzha', 'Pathanamthitta', 'Kollam', 'Thiruvananthapuram'].map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
                  </div>

                  {/* Area Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.areaType} *</label>
                    <div className="space-y-2">
                      {['Urban', 'Semi Urban', 'Rural'].map((val) => (
                        <label key={val} className="flex items-center space-x-3 cursor-pointer">
                          <input type="radio" value={val} {...register('area_type', { required: t.required })} className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500" />
                          <span className="text-gray-700">
                            {val === 'Urban' ? t.urban : val === 'Semi Urban' ? t.semiUrban : t.rural}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.area_type && <p className="text-red-500 text-sm mt-1">{errors.area_type.message}</p>}
                  </div>

                  {/* Profession */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.profession} *</label>
                    <select {...register('profession', { required: t.required })} className="w-full border border-gray-300 rounded-lg px-4 py-2 glass-input focus:ring-2 focus:ring-green-500 outline-none">
                      <option value="">{t.otherPlaceholder}</option>
                      <option value="Student">{t.student}</option>
                      <option value="Government Employee">{t.govtEmployee}</option>
                      <option value="Private Employee">{t.privateEmployee}</option>
                      <option value="Business">{t.business}</option>
                      <option value="Daily Wage Worker">{t.dailyWage}</option>
                      <option value="Homemaker">{t.homemaker}</option>
                      <option value="Retired">{t.retired}</option>
                      <option value="Not Working">{t.notWorking}</option>
                      <option value="Other">{t.other}</option>
                    </select>
                    {profession === 'Other' && (
                      <input type="text" {...register('profession_other', { required: t.required })} placeholder={t.otherPlaceholder} className="mt-3 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
                    )}
                    {errors.profession && <p className="text-red-500 text-sm mt-1">{errors.profession.message}</p>}
                  </div>

                  {/* Marital Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.maritalStatus} *</label>
                    <div className="space-y-2">
                      {['Married', 'Unmarried', 'Other'].map((val) => (
                        <label key={val} className="flex items-center space-x-3 cursor-pointer">
                          <input type="radio" value={val} {...register('marital_status', { required: t.required })} className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500" />
                          <span className="text-gray-700">
                            {val === 'Married' ? t.married : val === 'Unmarried' ? t.unmarried : t.other}
                          </span>
                        </label>
                      ))}
                    </div>
                    {maritalStatus === 'Other' && (
                      <input type="text" {...register('marital_other', { required: t.required })} placeholder={t.otherPlaceholder} className="mt-3 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
                    )}
                    {errors.marital_status && <p className="text-red-500 text-sm mt-1">{errors.marital_status.message}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-1 gap-8">
                  {/* Q1 */}
                  <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100/50 shadow-sm">
                    <label className="block text-base font-semibold text-gray-800 mb-3">{t.q1} *</label>
                    <div className="space-y-3">
                      {['cost', 'delay', 'career', 'migration', 'lifestyle', 'health', 'Other'].map((val) => (
                        <label key={val} className="flex items-center space-x-3 cursor-pointer">
                          <input type="radio" value={val} {...register('question1', { required: t.required })} className="h-4 w-4 text-green-600 focus:ring-green-500" />
                          <span className="text-gray-700">{val === 'Other' ? t.other : t.q1Options[val as keyof typeof t.q1Options]}</span>
                        </label>
                      ))}
                    </div>
                    {q1 === 'Other' && (
                      <input type="text" {...register('question1_other', { required: t.required })} placeholder={t.otherPlaceholder} className="mt-3 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
                    )}
                    {errors.question1 && <p className="text-red-500 text-sm mt-1">{errors.question1.message}</p>}
                  </div>

                  {/* Q2 */}
                  <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100/50 shadow-sm">
                    <label className="block text-base font-semibold text-gray-800 mb-3">{t.q2} *</label>
                    <div className="space-y-3">
                      {['Yes', 'No', 'Other'].map((val) => (
                        <label key={val} className="flex items-center space-x-3 cursor-pointer">
                          <input type="radio" value={val} {...register('question2', { required: t.required })} className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700">{val === 'Yes' ? t.yes : val === 'No' ? t.no : t.other}</span>
                        </label>
                      ))}
                    </div>
                    {q2 === 'Other' && (
                      <input type="text" {...register('question2_other', { required: t.required })} placeholder={t.otherPlaceholder} className="mt-3 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                    )}
                    {errors.question2 && <p className="text-red-500 text-sm mt-1">{errors.question2.message}</p>}
                  </div>

                  {/* Q3 */}
                  <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100/50 shadow-sm">
                    <label className="block text-base font-semibold text-gray-800 mb-3">{t.q3} *</label>
                    <div className="space-y-3">
                      {['financial', 'childcare', 'leave', 'education', 'housing', 'tax'].map((val) => (
                        <label key={val} className="flex items-center space-x-3 cursor-pointer">
                          <input type="checkbox" value={val} {...register('question3', { required: t.required })} className="h-4 w-4 text-blue-600 rounded" />
                          <span className="text-gray-700">{t.q3Options[val as keyof typeof t.q3Options]}</span>
                        </label>
                      ))}
                    </div>
                    {errors.question3 && <p className="text-red-500 text-sm mt-1">{errors.question3.message}</p>}
                  </div>

                  {/* Q4 */}
                  <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100/50 shadow-sm">
                    <label className="block text-base font-semibold text-gray-800 mb-3">{t.q4} *</label>
                    <div className="space-y-3">
                      {['Yes', 'No', 'Other'].map((val) => (
                        <label key={val} className="flex items-center space-x-3 cursor-pointer">
                          <input type="radio" value={val} {...register('question4', { required: t.required })} className="h-4 w-4 text-blue-600" />
                          <span className="text-gray-700">{val === 'Yes' ? t.yes : val === 'No' ? t.no : t.other}</span>
                        </label>
                      ))}
                    </div>
                    {q4 === 'Other' && (
                      <input type="text" {...register('question4_other', { required: t.required })} placeholder={t.otherPlaceholder} className="mt-3 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                    )}
                    {errors.question4 && <p className="text-red-500 text-sm mt-1">{errors.question4.message}</p>}
                  </div>

                  {/* Q5 */}
                  <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100/50 shadow-sm">
                    <label className="block text-base font-semibold text-gray-800 mb-3">{t.q5} *</label>
                    <textarea {...register('question5', { required: t.required })} rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                    {errors.question5 && <p className="text-red-500 text-sm mt-1">{errors.question5.message}</p>}
                  </div>

                  {/* Q6 */}
                  <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100/50 shadow-sm">
                    <label className="block text-base font-semibold text-gray-800 mb-3">{t.q6} *</label>
                    <div className="space-y-3">
                      {['financial', 'childcare', 'leave', 'education', 'housing', 'tax'].map((val) => (
                        <label key={val} className="flex items-center space-x-3 cursor-pointer">
                          <input type="checkbox" value={val} {...register('question6', { required: t.required })} className="h-4 w-4 text-blue-600 rounded" />
                          <span className="text-gray-700">{t.q6Options[val as keyof typeof t.q6Options]}</span>
                        </label>
                      ))}
                    </div>
                    {errors.question6 && <p className="text-red-500 text-sm mt-1">{errors.question6.message}</p>}
                  </div>

                  {/* Q7 */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <label className="block text-base font-semibold text-gray-800 mb-3">{t.q7} *</label>
                    <div className="space-y-3">
                      {['Yes', 'No'].map((val) => (
                        <label key={val} className="flex items-center space-x-3 cursor-pointer">
                          <input type="radio" value={val} {...register('question7', { required: t.required })} className="h-4 w-4 text-blue-600" />
                          <span className="text-gray-700">{val === 'Yes' ? t.yes : t.no}</span>
                        </label>
                      ))}
                    </div>
                    {errors.question7 && <p className="text-red-500 text-sm mt-1">{errors.question7.message}</p>}
                  </div>
                  
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-10 flex justify-between pt-6 border-t border-gray-100">
            {step === 2 ? (
              <button type="button" onClick={handlePrevious} className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-2 rounded-lg font-medium transition-colors">
                {t.previous}
              </button>
            ) : (
              <div></div>
            )}
            <button type="submit" disabled={isSubmitting} className="group relative inline-flex items-center justify-center px-10 py-3 text-lg font-medium text-white transition-all duration-300 ease-in-out bg-emerald-600 border border-transparent rounded-lg hover:bg-emerald-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed" style={{ backgroundColor: 'var(--color-primary)' }}>
              {isSubmitting ? 'Submitting...' : step === 1 ? t.next : t.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
