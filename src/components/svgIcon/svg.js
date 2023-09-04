const context=require.context('./icon',false,/\.svg$/)
const requireAll=requireContext=>requireContext.keys().map(requireContext)
requireAll(context)
