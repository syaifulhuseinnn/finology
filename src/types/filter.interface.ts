export interface Options {
  label: string;
  value: string;
}

export interface FilterDropdownProps {
  cities: Options[];
  companies: Options[];
  setFilterCity: (city: string) => void;
  setFilterCompany: (company: string) => void;
}

export interface FilterButtonProps {
  children: React.ReactNode;
}
