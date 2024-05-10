import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Label,
  Description,
  Field,
  Select,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { getProvinces, getQuintiles } from "../api/formData";
import { Province, QuintileData } from "../types/formData";

export function InputTabs() {
  const [provinces, setProvinces] = useState<Province[] | undefined>();
  const [quintiles, setQuintiles] = useState<QuintileData | undefined>();
  const [province, setProvince] = useState("");
  const [quintile, setQuintile] = useState("");

  useEffect(() => {
    getProvinces().then(setProvinces);
  }, []);

  useEffect(() => {
    getQuintiles(province).then(setQuintiles);
  }, [province]);

  const handleProvinceChange = (event: any) => {
    console.log(event.target.value);
    setProvince(event.target.value);
  };

  return (
    <TabGroup className="bg-gray-200 shadow-xl w-max p-4 rounded-lg text-gray-900 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
      <TabList className="flex gap-4">
        <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold focus:outline-none data-[selected]:bg-white/20 data-[hover]:bg-white/10 data-[selected]:data-[hover]:bg-white/20 data-[focus]:outline-1 data-[focus]:outline-white">
          Simple
        </Tab>
        <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold focus:outline-none data-[selected]:bg-white/20 data-[hover]:bg-white/10 data-[selected]:data-[hover]:bg-white/20 data-[focus]:outline-1 data-[focus]:outline-white">
          Detailed (coming soon)
        </Tab>
      </TabList>
      <TabPanels className="mt-3">
        <TabPanel className="rounded-xl bg-white/10 p-3">
          <h2 className="text-lg font-semibold">
            Please fill out the following fields:
          </h2>
          <Field>
            <Label className="text-md font-medium text-gray-800">
              Of which province are you a resident?
            </Label>
            <Description className="text-sm text-gray-800/50">
              The payment you receive varies by province. <br /> Only backstop
              provinces are available at the moment
            </Description>
            <Select
              className="bg-gray-100 rounded-lg border-none w-full p-2"
              value={province}
              onChange={handleProvinceChange}
            >
              <option disabled selected value="">
                {" "}
                -- select an option --{" "}
              </option>
              {provinces &&
                provinces.map((prov) => (
                  <option value={prov.code} key={prov.code}>
                    {prov.name}
                  </option>
                ))}
            </Select>
          </Field>
          <Field>
            <Label className="text-md font-medium text-gray-800">
              In what range is your total household income?
            </Label>
            <Description className="text-sm text-gray-800/50">
              The PBO offers estimates of net impact over time based on income
              levels
            </Description>
            <Select
              className="bg-gray-100 rounded-lg border-none w-full p-2"
              value={quintile}
              onChange={(e) => setQuintile(e.target.value)}
            >
              {quintiles ? (
                Object.entries(quintiles).map(([q, [min, max]]) => (
                  <option value={q} key={q}>
                    {max ? `${min} - ${max}` : `${min}+`}
                  </option>
                ))
              ) : (
                <></>
              )}
            </Select>
          </Field>
          <button className="px-2 py-1 bg-mui-data rounded-lg shadow-md mt-4 font-bold data-[hover]:shadow-none">
            Submit
          </button>
        </TabPanel>
        <TabPanel className="rounded-xl bg-white/10 p-3">Hidden</TabPanel>
      </TabPanels>
    </TabGroup>
  );
}