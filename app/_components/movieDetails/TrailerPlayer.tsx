"use client";
import ReactPlayer from "react-player";

export default function TrailerPlayer({ url }: { url: string }) {
    return (
        <div
            style={{
                position: "relative",
                paddingTop: "56.25%",
            }}
        >
            <div style={{ position: "absolute", inset: 0 }}>
                <ReactPlayer
                    src={url}
                    width="100%"
                    height="100%"
                    controls
                    light
                    playing={false}
                    className="rounded-2xl overflow-hidden"
                />
            </div>
        </div>
    );
}
