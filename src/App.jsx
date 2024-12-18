import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Template from "./pages/TemplatePage";
import Builder from "./pages/BuilderPage";

// const Builder = () => (
//   <div className="grid grid-cols-2 h-screen">
//     <div className="p-4 overflow-auto">
//       {/* Form will go here */}
//       <h2>CV Form</h2>
//       <button className="bg-blue-500 text-white px-4 py-2 rounded">Go to Preview</button>
//     </div>
//     <div className="bg-gray-100 p-4 overflow-auto">
//       {/* Live preview will go here */}
//       <h2>Live Preview</h2>
//     </div>
//   </div>
// );

// const Preview = () => (
//   <div>
//     <h2>Full Preview Page</h2>
//     <button className="bg-blue-500 text-white px-4 py-2 rounded">Back to Editor</button>
//   </div>
// );

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/template" replace />} />
          <Route path="/template" element={<Template />} />
          <Route path="/builder" element={<Builder />} />
          {/* <Route path="/preview" element={<Preview />} />  */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
