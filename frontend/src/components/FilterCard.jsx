import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDispatch } from 'react-redux';
import { setSearchText } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Noida", "Gaziabad", "Gurugram", "Greater Noida", "Narnaul", "Rewari", "Rampur", "Moradabad", "Bihar", "Gawalior", "Mirzapur"]
    },
    {
        filterType: "Industry",
        array: ["Civil Engineering", "Electrical engineering", "Computer Engineering", "Agricultural engineering", "Mechanical Engineering"]
    },
    {
        filterType: "Salary",
        array: ["0 - 500", "500 to 1000", "1000 to 2000", "2000 to 5000"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const handleChange = (value) => {
        setSelectedValue(value);
    };
    useEffect(() => {
        dispatch(setSearchText(selectedValue));
    }, [selectedValue])

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-lg'>Filter job</h1>
            </div>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={handleChange}>
                {filterData.map((data, index) => (
                    <div key={index}>
                        <h1 className='font-medium text-lg'>{data.filterType}</h1>
                        {data.array.map((item, idx) => {
                            const itemId = `r${index}-${idx}`; // Ensure unique id for each radio button
                            return (
                                <div key={idx} className="flex items-center space-x-2 my-2">
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
