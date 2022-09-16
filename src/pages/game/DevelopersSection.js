import DeveloperChip from "./DeveloperChip"

export default (props) => {
    
    return (
        <section className="z-[2] relative mx-auto max-w-[1000px] py-[20px] border-b border-neu1-3 dark:border-neu1-7 flex flex-col">
            <h3 className="text-[28px] font-Lato font-black text-neu1-8 dark:text-neu1-2 block">Developers</h3>
            <div className="mt-[15px] flex flex-wrap gap-[10px]">
                {
                    props.developers.map((dev, index) => <DeveloperChip name={dev.name} key={index}></DeveloperChip>)
                }
            </div>
        </section>
    )
}
