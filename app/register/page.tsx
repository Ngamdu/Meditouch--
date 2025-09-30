'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Shield, User, Stethoscope, Building, Pill, Heart, Upload, Fingerprint, Mail, Phone, MapPin } from 'lucide-react';

type UserType = 'patient' | 'doctor' | 'nurse' | 'hospital' | 'pharmacy';

interface BaseRegistrationData {
  userType: UserType;
  email: string;
  phone: string;
  address: string;
}

interface PatientData extends BaseRegistrationData {
  userType: 'patient';
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  bloodGroup: string;
  emergencyContact: string;
  allergies: string;
  medicalConditions: string;
}

interface ProfessionalData extends BaseRegistrationData {
  userType: 'doctor' | 'nurse';
  firstName: string;
  lastName: string;
  licenseNumber: string;
  specialization: string;
  qualifications: string;
  yearsOfExperience: string;
}

interface OrganizationData extends BaseRegistrationData {
  userType: 'hospital' | 'pharmacy';
  organizationName: string;
  licenseNumber: string;
  adminName: string;
  adminEmail: string;
  facilityType: string;
  capacity?: string;
  services?: string;
}

type RegistrationData = PatientData | ProfessionalData | OrganizationData;

export default function RegistrationPage() {
  const [step, setStep] = useState<'role' | 'details' | 'verification'>('role');
  const [selectedType, setSelectedType] = useState<UserType>('patient');
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationData>();

  const userTypes = [
    { 
      type: 'patient', 
      icon: Heart, 
      label: 'Patient', 
      description: 'Manage your health records and access healthcare services',
      color: 'blue'
    },
    { 
      type: 'doctor', 
      icon: Stethoscope, 
      label: 'Doctor', 
      description: 'Medical professionals providing patient care',
      color: 'green'
    },
    { 
      type: 'nurse', 
      icon: User, 
      label: 'Nurse', 
      description: 'Healthcare professionals assisting in patient care',
      color: 'purple'
    },
    { 
      type: 'hospital', 
      icon: Building, 
      label: 'Hospital', 
      description: 'Healthcare facilities managing patient care',
      color: 'red'
    },
    { 
      type: 'pharmacy', 
      icon: Pill, 
      label: 'Pharmacy', 
      description: 'Medication dispensing and management',
      color: 'orange'
    },
  ];

  const onSubmit = (data: RegistrationData) => {
    console.log('Registration data:', data);
    setStep('verification');
  };

  const renderPatientForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            {...register('firstName', { required: 'First name is required' })}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            {...register('lastName', { required: 'Last name is required' })}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date of Birth *
        </label>
        <input
          {...register('dateOfBirth', { required: 'Date of birth is required' })}
          type="date"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.dateOfBirth && (
          <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blood Group
          </label>
          <select
            {...register('bloodGroup')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Emergency Contact *
          </label>
          <input
            {...register('emergencyContact', { required: 'Emergency contact is required' })}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="+1 (555) 987-6543"
          />
          {errors.emergencyContact && (
            <p className="text-red-500 text-sm mt-1">{errors.emergencyContact.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Known Allergies
        </label>
        <input
          {...register('allergies')}
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="List any allergies (e.g., Penicillin, nuts)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Medical Conditions
        </label>
        <textarea
          {...register('medicalConditions')}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Any existing medical conditions"
        />
      </div>

      {/* Biometric Registration */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <Fingerprint className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-800">Contactless Biometric Registration</span>
        </div>
        <p className="text-blue-700 text-sm mb-4">
          For secure access to your medical records. You'll complete handprint scanning at your first hospital visit or using our mobile app with supported devices.
        </p>
        <div className="flex items-center gap-2 text-blue-600">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <span className="text-sm">Contactless handprint technology</span>
        </div>
        <div className="flex items-center gap-2 text-blue-600">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <span className="text-sm">HIPAA compliant biometric storage</span>
        </div>
      </div>
    </div>
  );

  const renderProfessionalForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            {...register('firstName', { required: 'First name is required' })}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            {...register('lastName', { required: 'Last name is required' })}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional License Number *
        </label>
        <input
          {...register('licenseNumber', { required: 'License number is required' })}
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your official license number"
        />
        {errors.licenseNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.licenseNumber.message}</p>
        )}
      </div>

      {selectedType === 'doctor' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialization *
          </label>
          <select
            {...register('specialization', { required: 'Specialization is required' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Specialization</option>
            <option value="cardiology">Cardiology</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="surgery">Surgery</option>
            <option value="internal-medicine">Internal Medicine</option>
            <option value="neurology">Neurology</option>
            <option value="other">Other</option>
          </select>
          {errors.specialization && (
            <p className="text-red-500 text-sm mt-1">{errors.specialization.message}</p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Qualifications *
        </label>
        <input
          {...register('qualifications', { required: 'Qualifications are required' })}
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="MD, MBBS, RN, BSN, etc."
        />
        {errors.qualifications && (
          <p className="text-red-500 text-sm mt-1">{errors.qualifications.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Years of Experience *
        </label>
        <select
          {...register('yearsOfExperience', { required: 'Experience is required' })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Experience</option>
          <option value="0-2">0-2 years</option>
          <option value="3-5">3-5 years</option>
          <option value="6-10">6-10 years</option>
          <option value="10+">10+ years</option>
        </select>
        {errors.yearsOfExperience && (
          <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience.message}</p>
        )}
      </div>

      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-center gap-2 mb-2">
          <Upload className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">License Verification Required</span>
        </div>
        <p className="text-yellow-700 text-sm">
          You will need to upload your professional license and identification documents for verification. This process typically takes 24-48 hours.
        </p>
      </div>
    </div>
  );

  const renderOrganizationForm = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {selectedType === 'hospital' ? 'Hospital Name *' : 'Pharmacy Name *'}
        </label>
        <input
          {...register('organizationName', { required: 'Organization name is required' })}
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder={selectedType === 'hospital' ? "General Hospital" : "City Pharmacy"}
        />
        {errors.organizationName && (
          <p className="text-red-500 text-sm mt-1">{errors.organizationName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Facility License Number *
        </label>
        <input
          {...register('licenseNumber', { required: 'License number is required' })}
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter facility license number"
        />
        {errors.licenseNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.licenseNumber.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Administrator Name *
          </label>
          <input
            {...register('adminName', { required: 'Administrator name is required' })}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Admin responsible"
          />
          {errors.adminName && (
            <p className="text-red-500 text-sm mt-1">{errors.adminName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admin Email *
          </label>
          <input
            {...register('adminEmail', { 
              required: 'Admin email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            })}
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="admin@facility.com"
          />
          {errors.adminEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.adminEmail.message}</p>
          )}
        </div>
      </div>

      {selectedType === 'hospital' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hospital Type *
            </label>
            <select
              {...register('facilityType', { required: 'Hospital type is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Hospital Type</option>
              <option value="public">Public Hospital</option>
              <option value="private">Private Hospital</option>
              <option value="specialty">Specialty Hospital</option>
              <option value="teaching">Teaching Hospital</option>
            </select>
            {errors.facilityType && (
              <p className="text-red-500 text-sm mt-1">{errors.facilityType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bed Capacity
            </label>
            <input
              {...register('capacity')}
              type="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Number of beds"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialized Services
            </label>
            <textarea
              {...register('services')}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Emergency care, surgery, maternity, ICU, etc."
            />
          </div>
        </>
      )}

      {selectedType === 'pharmacy' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pharmacy Services
          </label>
          <textarea
            {...register('services')}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Prescription dispensing, OTC medications, health consultations, etc."
          />
        </div>
      )}

      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-center gap-2 mb-2">
          <Upload className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">Business Verification Required</span>
        </div>
        <p className="text-yellow-700 text-sm">
          You will need to upload your business license, facility registration, and other required documents for verification.
        </p>
      </div>
    </div>
  );

  const renderFormContent = () => {
    switch (selectedType) {
      case 'patient':
        return renderPatientForm();
      case 'doctor':
      case 'nurse':
        return renderProfessionalForm();
      case 'hospital':
      case 'pharmacy':
        return renderOrganizationForm();
      default:
        return null;
    }
  };

  const renderCommonFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
          <input
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            })}
            type="email"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="your.email@example.com"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <div className="relative">
          <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
          <input
            {...register('phone', { required: 'Phone number is required' })}
            type="tel"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 foc
