import PlatformChip from "./PlatformChip"

export default (props) => {

    return (

        <section className="z-[2] relative mx-auto max-w-[1000px] py-[20px] border-b border-neu1-3 dark:border-neu1-7 flex flex-col">
            <h3 className="text-[28px] font-Lato font-black text-neu1-8 dark:text-neu1-2 block">Platforms</h3>
            <div className="mt-[20px] flex flex-wrap gap-[10px]">
                {
                    props.platforms.map((platform, index) => <PlatformChip key={index} plaformName={platform.platform.name}></PlatformChip>)
                }
            </div>
        </section>
    )
}
