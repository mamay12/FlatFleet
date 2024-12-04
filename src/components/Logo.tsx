const Logo: React.FC<{ alt?: boolean }> = ({ alt = false }) => {
    return (
        <div className={`logo-wrapper ${alt ? "alt" : ""}`}>
            <svg width="103" height="103" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_117_6638" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="13" y="13" width="78" height="78">
                    <rect x="13" y="13" width="77.021" height="77.021" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_117_6638)">
                    <path className="logo" d="M28.9871 77.5948L14.6147 51.7569L29.1486 25.9189H42.0675L27.5337 51.7569L35.931 66.7752L61.123 25.9189H74.3649L88.8988 51.7569L74.3649 77.5948H61.446L75.9798 51.7569L67.5825 36.9001L42.552 77.5948H28.9871Z" />
                </g>
            </svg>

        </div>
    );
};

export default Logo; 