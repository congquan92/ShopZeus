import {  useState } from "react";

export default function useTest( input: string ) {
    const [data, setData] = useState<string>(input);
    function upper(){
        setData(data.toUpperCase());
        return data;
    }
    return {data, upper};
}
