import TextAnimateWriter from "./TextAnimateWriter";
import PrinterLoader from "./PrinterLoader";

export default function HeroTextBanner() {
    return (
        <div className="hidden lg:flex   border-1 border-red-500/50 bg-primary-foreground rounded-2xl p-4 mt-10 animate-pulse fade-in-5 fade-out-5 backdrop-blur-3xl duration-1000 flex-col gap-4 justify-center items-center text-center">
            <PrinterLoader />
            <TextAnimateWriter />
        </div>
    );
}
