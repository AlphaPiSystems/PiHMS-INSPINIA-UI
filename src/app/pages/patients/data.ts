export type PatientType = {
    id: number,
    patientNo: string,
    patientName: string,
    phoneNumber: string,
    registrationDate: string,
    age: number,
    gender: string,
    LastVisitDate: string
}

export const karnatakaCities: string[] = [
  'Bangalore', 'Mysuru', 'Mangaluru', 'Hubballi', 'Dharwad',
  'Belagavi', 'Kalaburagi', 'Davangere', 'Ballari', 'Vijayapura',
  'Shivamogga', 'Tumakuru', 'Raichur', 'Bidar', 'Hassan',
  'Udupi', 'Chikkamagaluru', 'Kolar', 'Mandya', 'Bagalkote',
  'Gadag', 'Chamarajanagar', 'Kodagu', 'Haveri', 'Yadgir',
  'Chitradurga', 'Ramanagara', 'Koppal'
];

export const countries: string[] = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Netherlands',
  'Singapore',
  'United Arab Emirates',
  'Saudi Arabia',
  'Japan',
  'China',
  'South Korea',
  'Brazil',
  'South Africa',
  'New Zealand'
];

export const indiaStates: string[] = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  // Union Territories
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];
export const patientData: PatientType[] = [
    {
        id: 1,
        patientNo: "P1001",
        patientName: "Praveen Kumar",
        phoneNumber: "9876543210",
        registrationDate: "2026-03-01",
        age: 30,
        gender: "Male",
        LastVisitDate: "2026-04-01"
    },
    {
        id: 2,
        patientNo: "P1002",
        patientName: "Anjali Sharma",
        phoneNumber: "9123456780",
        registrationDate: "2026-03-02",
        age: 25,
        gender: "Female",
        LastVisitDate: "2026-04-01"

    },
    {
        id: 3,
        patientNo: "P1003",
        patientName: "Suresh Reddy",
        phoneNumber: "9988776655",
        registrationDate: "2026-03-03",
        age: 40,
        gender: "Male",
        LastVisitDate: "2026-04-01"
    },
    {
        id: 4,
        patientNo: "P1004",
        patientName: "Priya Nair",
        phoneNumber: "9090909090",
        registrationDate: "2026-03-04",
        age: 35,
        gender: "Female",
        LastVisitDate: "2026-04-01"
    },
    {
        id: 5,
        patientNo: "P1005",
        patientName: "Karthik Rao",
        phoneNumber: "9345678123",
        registrationDate: "2026-03-05",
        age: 28,
        gender: "Male",
        LastVisitDate: "2026-04-01"
    },
    {
        id: 6,
        patientNo: "P1006",
        patientName: "Meena Das",
        phoneNumber: "9812345678",
        registrationDate: "2026-03-06",
        age: 32,
        gender: "Female",
        LastVisitDate: "2026-04-01"

    },
    {
        id: 7,
        patientNo: "P1007",
        patientName: "Arjun Singh",
        phoneNumber: "9765432109",
        registrationDate: "2026-03-07",
        age: 27,
        gender: "Male",
        LastVisitDate: "2026-04-01"

    },
    {
        id: 8,
        patientNo: "P1008",
        patientName: "Sneha Patil",
        phoneNumber: "9898989898",
        registrationDate: "2026-03-08",
        age: 30,
        gender: "Female",
        LastVisitDate: "2026-04-01"
    },
    {
        id: 9,
        patientNo: "P1009",
        patientName: "Rahul Verma",
        phoneNumber: "9001122334",
        registrationDate: "2026-03-09",
        age: 29,
        gender: "Male",
        LastVisitDate: "2026-04-01"
    },
    {
        id: 10,
        patientNo: "P1010",
        patientName: "Divya Iyer",
        phoneNumber: "9556677889",
        registrationDate: "2026-03-10",
        age: 31,
        gender: "Female",
        LastVisitDate: "2026-04-01"
    }
];
