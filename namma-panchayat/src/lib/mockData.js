export const mockMandiPrices = [
  { id: 1, crop: { en: "Ragi", kn: "ರಾಗಿ" }, price: "₹2,800", unit: "Quintal", trend: "up" },
  { id: 2, crop: { en: "Tomato", kn: "ಟೊಮೆಟೊ" }, price: "₹1,200", unit: "Box", trend: "down" },
  { id: 3, crop: { en: "Silk Cocoon", kn: "ರೇಷ್ಮೆ ಗೂಡು" }, price: "₹450", unit: "Kg", trend: "stable" },
  { id: 4, crop: { en: "Maize", kn: "ಮೆಕ್ಕೆಜೋಳ" }, price: "₹2,100", unit: "Quintal", trend: "up" },
];

export const mockJobs = [
  { id: 1, title: { en: "MGNREGA Canal Work", kn: "ನರೇಗಾ ಕಾಲುವೆ ಕೆಲಸ" }, location: "Ward 4", pay: "₹316/day" },
  { id: 2, title: { en: "Factory Helper", kn: "ಕಾರ್ಖಾನೆ ಸಹಾಯಕ" }, location: "Industrial Area", pay: "₹12,000/month" },
];

export const mockSchemes = [
  { 
    id: 1, 
    name: { en: "Gruha Lakshmi", kn: "ಗೃಹ ಲಕ್ಷ್ಮಿ" }, 
    benefit: { en: "₹2,000 monthly for woman head of family", kn: "ಕುಟುಂಬದ ಮಹಿಳಾ ಯಜಮಾನಿಗೆ ಮಾಸಿಕ ₹2,000" },
    eligible: true 
  },
  { 
    id: 2, 
    name: { en: "Anna Bhagya", kn: "ಅನ್ನ ಭಾಗ್ಯ" }, 
    benefit: { en: "10kg free rice per person", kn: "ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ 10 ಕೆಜಿ ಉಚಿತ ಅಕ್ಕಿ" },
    eligible: true 
  },
];

export const mockBills = [
  { id: 1, type: { en: "Electricity (KEB)", kn: "ವಿದ್ಯುತ್ (ಕೆಇಬಿ)" }, amount: 450, dueDate: "2026-05-10" },
  { id: 2, type: { en: "Water Bill", kn: "ನೀರಿನ ಬಿಲ್" }, amount: 120, dueDate: "2026-05-15" },
];

export const mockSchoolUpdates = [
  { id: 1, title: { en: "Roof Repair", kn: "ಛಾವಣಿ ದುರಸ್ತಿ" }, status: "In Progress", progress: 65 },
  { id: 2, title: { en: "New Toilets", kn: "ಹೊಸ ಶೌಚಾಲಯಗಳು" }, status: "Completed", progress: 100 },
];

// Initial Village Population (Sample of 150 families / 600 people)
// For mock purposes, we'll provide a representative sample
export const mockCitizens = [
  { 
    id: "CIT-001", 
    familyId: "FAM-01", 
    name: "Basavaraj", 
    dob: "1978-05-15", 
    age: 46, 
    gender: "Male", 
    phone: "9876543210", 
    isHead: true,
    ward: "4"
  },
  { 
    id: "CIT-002", 
    familyId: "FAM-01", 
    name: "Lakshmi", 
    dob: "1982-08-20", 
    age: 42, 
    gender: "Female", 
    phone: "9876543211", 
    isHead: false,
    ward: "4"
  },
  { 
    id: "CIT-003", 
    familyId: "FAM-02", 
    name: "Gowda", 
    dob: "1965-03-10", 
    age: 59, 
    gender: "Male", 
    phone: "9876543212", 
    isHead: true,
    ward: "1"
  },
  { 
    id: "CIT-004", 
    familyId: "FAM-03", 
    name: "Mala", 
    dob: "1988-11-25", 
    age: 36, 
    gender: "Female", 
    phone: "9876543214", 
    isHead: true,
    ward: "3"
  },
  { 
    id: "CIT-005", 
    familyId: "FAM-04", 
    name: "Suresh", 
    dob: "1992-01-12", 
    age: 32, 
    gender: "Male", 
    phone: "9876543213", 
    isHead: true,
    ward: "4"
  }
];
