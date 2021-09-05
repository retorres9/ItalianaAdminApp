export interface Address {
  place_id:     number;
  licence:      string;
  osm_type:     string;
  osm_id:       number;
  lat:          string;
  lon:          string;
  place_rank:   number;
  category:     string;
  type:         string;
  importance:   number;
  addresstype:  string;
  name:         string;
  display_name: string;
  address:      AddressClass;
  boundingbox:  string[];
}

export interface AddressClass {
  amenity:       string;
  road:          string;
  neighbourhood: string;
  town:          string;
  county:        string;
  state:         string;
  postcode:      string;
  country:       string;
  country_code:  string;
}
