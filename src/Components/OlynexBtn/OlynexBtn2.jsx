import { Button } from "@material-tailwind/react";


const OlynexBtn2 = ({btnContent2}) => {
    return (
        <div>
            <Button type="submit" className="text-white bg-[#0099ff] hover:bg-[#197cbe] px-2 py-2 rounded " fullWidth>
                {btnContent2}
            </Button>
        </div>
    );
};

export default OlynexBtn2;