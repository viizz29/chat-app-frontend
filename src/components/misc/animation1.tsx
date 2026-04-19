import LottieImport from "lottie-react";
import animationData from "../../assets/lottie-folders.json";

const Lottie = LottieImport.default || LottieImport;

const Animation1 = () => {

    // console.log("Lottie:", Lottie);
    // console.log("animationData:", animationData);

    return (
        <div style={{ width: 200, height: 200 }}>
            <Lottie animationData={animationData} loop={true} />
            {/* {JSON.stringify(animationData)}; */}
        </div>
    );
};

export default Animation1;