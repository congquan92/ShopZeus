
export default function BannerEffect(props: { imageUrl: string }) {
  return (
    <div className="w-full max-w-[1600px] mx-auto">
        <img src={props.imageUrl} alt="Banner Effect" className="w-full h-auto" />
    </div>
  )
}
