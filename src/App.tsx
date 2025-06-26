import './App.css'
import ColorConverter from './components/color-converter'
import ImageManager from './components/image-manager'
import StepsTracker from './components/steps-tracker'

function App() {
  return (
    <div className="app-container">
      <ColorConverter />
      <StepsTracker />
      <ImageManager />
    </div>
  )
}

export default App
