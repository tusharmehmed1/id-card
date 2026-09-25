export type CardOrientation = 'portrait' | 'landscape';

export interface CardData {
  fullName: string;
  profession: string;
  freelancerId: string;
  dateOfBirth: string; // YYYY-MM-DD
  issueDate: string;   // YYYY-MM-DD
  expireDate: string;  // YYYY-MM-DD
  district: string;
  photoUrl: string;
  photoScale: number;  // 1 to 2
  photoPositionX: number; // -50 to 50
  photoPositionY: number; // -50 to 50
  verifyUrl: string;
  supportEmail: string;
  organizationName: string;
  issuerTitle: string;
  orientation: CardOrientation;
}

export const BANGLADESH_DISTRICTS: string[] = [
  'Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Kishoreganj', 'Madaripur', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Rajbari', 'Shariatpur', 'Tangail',
  'Chattogram', 'Cox\'s Bazar', 'Cumilla', 'Brahmanbaria', 'Chandpur', 'Feni', 'Khagrachhari', 'Lakshmipur', 'Noakhali', 'Rangamati', 'Bandarban',
  'Sylhet', 'Habiganj', 'Moulvibazar', 'Sunamganj',
  'Rajshahi', 'Bogura', 'Joypurhat', 'Naogaon', 'Natore', 'Chapainawabganj', 'Pabna', 'Sirajganj',
  'Khulna', 'Bagerhat', 'Chuadanga', 'Jashore', 'Jhenaidah', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira',
  'Barishal', 'Barguna', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur',
  'Rangpur', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Thakurgaon',
  'Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'
];

export const POPULAR_PROFESSIONS: string[] = [
  'Photographer | Digital Marketer',
  'Full Stack Web Developer',
  'UI / UX & Product Designer',
  'Graphics Designer & Visual Artist',
  'Digital Marketing Specialist',
  'SEO & Content Strategist',
  'Cybersecurity Analyst',
  'App Developer (Flutter / React Native)',
  'Video Editor & Motion Designer',
  'Data Analyst & Python Specialist',
  'Virtual Assistant & Project Manager'
];
