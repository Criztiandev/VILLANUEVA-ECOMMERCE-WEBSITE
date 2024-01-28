import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, useState } from "react";

const BASE_API = "https://psgc.gitlab.io/api";

const usePhillAddress = () => {
  const [finalAddress, setFinalAddress] = useState("");
  const [regionCode, setRegionCode] = useState("");
  const [proviceCode, setProviceCode] = useState("");
  const [citiesCode, setCitiesCode] = useState("");
  const [municipalitiesCode, setMunicipalitiesCode] = useState("");

  const fetchRegion = async () => {
    const result = await axios.get(`${BASE_API}/regions`);
    return result.data;
  };
  const fetchSubPayload = async (
    root: string,
    endpoint: string,
    code: string
  ) => {
    if (!code) return;
    const result = await axios.get(`${BASE_API}/${root}/${code}/${endpoint}`);
    return result.data;
  };

  const regionQuery = useQuery({
    queryFn: fetchRegion,
    queryKey: ["regions"],
  });

  const provinceQuery = useQuery({
    queryFn: async () => fetchSubPayload("regions", "provinces", regionCode),
    queryKey: ["provinces"],
    enabled: !!regionCode,
  });

  const cities = useQuery({
    queryFn: async () => fetchSubPayload("provinces", "cities", proviceCode),
    queryKey: ["cities"],
    enabled: !!proviceCode,
  });

  const municipalities = useQuery({
    queryFn: async () =>
      fetchSubPayload("provinces", "municipalities", proviceCode),
    queryKey: ["municipalities"],
    enabled: !!citiesCode,
  });

  const barangays = useQuery({
    queryFn: async () => fetchSubPayload("cities", "barangays", citiesCode),
    queryKey: ["barangays"],
    enabled: !!municipalitiesCode,
  });

  const handleSelectRegion = (event: ChangeEvent<HTMLSelectElement>) => {
    const target = event.currentTarget;
    const [region, code] = target.value.split("-");

    setFinalAddress(region);
    setRegionCode(code);
  };

  const handleSelectProvince = (event: ChangeEvent<HTMLSelectElement>) => {
    const payload = event.currentTarget.value;
    const [province, code] = payload.split("-");

    setProviceCode(code);
    setFinalAddress((prev) => prev + "," + province); // Update the final address with the selected province
  };
  const handleSelectCities = (event: ChangeEvent<HTMLSelectElement>) => {
    const payload = event.currentTarget.value;
    const [city, code] = payload.split("-");
    setFinalAddress((prev) => prev + "," + city); // Update the final address with the selected province
    setCitiesCode(code);
  };
  const handleSelectMunicipalities = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const payload = event.currentTarget.value;
    const [municipality, code] = payload.split("-");
    setFinalAddress((prev) => prev + "," + municipality); // Update the final address with the selected province
    setMunicipalitiesCode(code);
  };

  const handleSelectedBarangay = (event: ChangeEvent<HTMLSelectElement>) => {
    const payload = event.currentTarget.value;
    const barangay = payload.split("-");
    setFinalAddress((prev) => prev + "," + barangay[0]); // Update the final address with the selected province
  };

  return {
    finalAddress,
    region: regionQuery,
    province: provinceQuery,
    cities: cities,
    municipalities: municipalities,
    barangays: barangays,

    regionCode,
    proviceCode,
    handleSelectRegion,
    handleSelectProvince,
    handleSelectCities,
    handleSelectMunicipalities,
    handleSelectedBarangay,
  };
};

export default usePhillAddress;
