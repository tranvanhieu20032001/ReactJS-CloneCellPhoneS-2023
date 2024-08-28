import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';

function SearchBar(props) {
    const { name, className, onSearch, onSelect, placeholder = '' } = props;
    const [searchResult, setSearchResult] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);
    const inputRef = useRef(null);
    const handleOnChange = async (value) => {
        if (value) {
            try {
                const searchResult = await onSearch(value);
                setSearchResult([...searchResult]);
            } catch (error) {
                console.log(error);
            }
        } else {
            setSearchResult([]);
        }
    };
    const handleOnSelect = (result) => {
        setSelectedResult(result);
        inputRef.current.value = '';
        handleOnChange();
    };
    useEffect(() => {
        if (selectedResult) {
            onSelect(selectedResult);
        }
    }, [selectedResult]);
    return (
        <div className={`flex items-center relative ${className}`}>
            <input
                className={`w-full rounded-tl-xl rounded-bl-xl p-[11px] outline-none focus:ring-0 placeholder-gray-300 border border-gray-200 text-xl `}
                type="text"
                ref={inputRef}
                placeholder={placeholder}
                onChange={(event) => handleOnChange(event.target.value)}
                autoComplete="off"
            />
            <div className="p-5 h-full text-white cursor-pointer bg-white rounded-tr-xl rounded-br-xl">
                <IoIosSearch className="text-[15px] text-red-300" />
            </div>
            {searchResult.length > 0 && (
                <div className="rounded-xl absolute flex flex-col bg-white text-black border shadow-2xl z-10 top-20 w-full">
                    {searchResult.map((result, index) => {
                        // console.log(result['attributes']['brand']['data']['attributes']['brandName']);
                        return (
                            <Link
                                to={`/${result['attributes']['brand']['data']['attributes']['brandName']}/${result.id}`}
                                className="hover:bg-gray-200 hover:text-white cursor-pointer p-3 rounded-xl"
                                onClick={() => handleOnSelect(result)}
                                key={index}
                                style={{color: 'black'}}
                            >
                                {result['attributes'][name]}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
