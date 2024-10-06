const ProgressBar: React.FC = () => {
    return (
        <div className="w-full max-w-md mx-auto">
          {/* <div className="flex-1 h-0.5 border-dashed border-t-2 border-purple-300"></div> */}
          {/* <!-- Progress Bar --> */}
          <div className="flex justify-between items-center mb-4">
            {/* <!-- Step 1 --> */}
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-purple-500"></div>
              <span className="text-xs mt-2">General</span>
            </div>
      
            {/* <!-- Dashed Line between Step 1 and Step 2 --> */}
            <div className="flex-1 h-0.5 border-dashed border-t-2 border-purple-300"></div>
      
            {/* <!-- Step 2 --> */}
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-gray-400"></div>
              <span className="text-xs mt-2">Instructions</span>
            </div>
      
            {/* <!-- Dashed Line between Step 2 and Step 3 --> */}
            <div className="flex-1 h-0.5 border-dashed border-t-2 border-gray-400"></div>
      
            {/* <!-- Step 3 --> */}
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-gray-400"></div>
              <span className="text-xs mt-2">Ingredients</span>
            </div>
      
            {/* <!-- Dashed Line between Step 3 and Step 4 --> */}
            <div className="flex-1 h-0.5 border-dashed border-t-2 border-gray-400"></div>
      
            {/* <!-- Step 4 --> */}
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-gray-400"></div>
              <span className="text-xs mt-2">Dietary</span>
            </div>
          </div>
        </div>
    )
}

export default ProgressBar;