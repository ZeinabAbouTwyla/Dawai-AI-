import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHeader } from '../../components/common/MobileHeader';
import { CaregiverBottomNav } from '../../components/navigation/CaregiverBottomNav';
import {
  Search,
  Plus,
  Heart,
  ChevronRight,
  ChevronLeft,
  Pill,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

export const Screen08PatientsList: React.FC = () => {
  const { patients, setActivePatientId, navigateTo, language } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const isAr = language === 'ar';
  const NextChevron = isAr ? ChevronLeft : ChevronRight;

  const filteredPatients = patients.filter((p) => {
    const term = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      p.nameAr.includes(term) ||
      p.relation.toLowerCase().includes(term) ||
      p.relationAr.includes(term)
    );
  });

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Family Patients"
        titleAr="أفراد العائلة والمرضى"
        showBack
        rightAction={
          <button
            onClick={() => navigateTo('patient_linking')}
            className="w-8 h-8 rounded-full bg-[#52766B] text-white flex items-center justify-center hover:bg-[#3F5C53] transition-colors"
            title={isAr ? 'إضافة مريض' : 'Add Patient'}
          >
            <Plus className="w-4 h-4" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737B74]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث عن مريض أو صلة القرابة...' : 'Search patient name or relation...'}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8E3D8] rounded-2xl text-xs text-[#454D46] focus:outline-none focus:border-[#52766B]"
          />
        </div>

        {/* Patients Cards List */}
        <div className="space-y-3">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => {
                setActivePatientId(patient.id);
                navigateTo('patient_profile');
              }}
              className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft cursor-pointer hover:border-[#52766B]/60 transition-all"
            >
              <div className="flex items-start gap-3.5">
                <img
                  src={patient.photo}
                  alt={patient.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-[#E8E3D8] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#454D46] truncate">
                      {isAr ? patient.nameAr : patient.name}
                    </h3>
                    <span className="text-[10px] font-bold bg-[#B7C6B0]/30 text-[#454D46] px-2 py-0.5 rounded-full border border-[#B7C6B0]/50">
                      {isAr ? 'حساب نشط' : 'Active'}
                    </span>
                  </div>

                  <div className="text-xs text-[#737B74] mt-0.5">
                    {isAr ? patient.relationAr : patient.relation} • {patient.age} {isAr ? 'سنة' : 'years old'}
                  </div>

                  {/* Conditions Chips */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(isAr ? patient.conditionsAr : patient.conditions).slice(0, 2).map((c, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-[#F7F5EF] text-[#454D46] px-2 py-0.5 rounded-lg border border-[#E8E3D8]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="mt-3.5 pt-3 border-t border-[#E8E3D8]/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[#52766B] font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{patient.adherenceRate}% {isAr ? 'التزام شهري' : 'Adherence'}</span>
                </div>

                <div className="flex items-center gap-1 text-[#737B74] font-medium text-[11px]">
                  <span>{isAr ? 'عرض الملف والتفاصيل' : 'View Profile'}</span>
                  <NextChevron className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Patient Prompt */}
        <button
          onClick={() => navigateTo('patient_linking')}
          className="w-full py-3 px-4 rounded-2xl bg-white border border-dashed border-[#52766B] text-[#52766B] hover:bg-[#52766B]/5 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? 'إضافة فرد جديد من العائلة' : 'Add another family member'}</span>
        </button>
      </div>

      <CaregiverBottomNav />
    </div>
  );
};
