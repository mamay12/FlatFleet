

export const CircledIcon: React.FC<{src: string}> = ({src}) => {
    return (
        <div className="circled-icon">
            <img alt="" src={src} className="icon" />
        </div>
    )
}