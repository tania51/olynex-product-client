import { Button } from "@material-tailwind/react";


const OlynexBtn = ({btnContent}) => {
    return (
        <div>
            <Button type="submit" className="mt-6 text-[white] bg-[#0099ff] p-2 rounded hover:border-b-4 border-[#99ff00]" fullWidth>
                {btnContent}
            </Button>
        </div>
    );
};

export default OlynexBtn;