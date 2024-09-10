import ClipLoader from "react-spinners/ClipLoader";

interface LoadingProps {
  loading: boolean,
}

const IsLoading: React.FC<LoadingProps> = ({loading})  => {
  return (
    <div className="flex items-center gap-8 w-full justify-center mt-8">
          <ClipLoader
            color="pink"
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <p className="text-sm font-light">Loading Data</p>
    </div>
  )
}

export default IsLoading