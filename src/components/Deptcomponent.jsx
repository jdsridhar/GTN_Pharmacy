import React from 'react';

// Reusable component for any department profile (e.g., CSE, IT)
const DepartmentProfile = ({ deptData, deptName }) => {
  // Helper to render tables with error handling
  const renderTable = (heading, headers, data) => {
    if (!Array.isArray(headers) || !Array.isArray(data)) return null;
    return (
      <div className="mb-6">
        {heading && <h3 className="text-xl font-semibold text-gray-800 mb-2">{heading}</h3>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                {headers.map((header, i) => (
                  <th key={i} className="py-2 px-4 border-b text-left text-gray-700">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {row.map((cell, j) => (
                    <td key={j} className="py-2 px-4 border-b text-gray-600">
                      {Array.isArray(cell) ? cell.join(', ') : cell || 'N/A'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Helper to render lists with error handling
  const renderList = (heading, items) => {
    if (!Array.isArray(items)) return null;
    return (
      <div className="mb-6">
        {heading && <h3 className="text-xl font-semibold text-gray-800 mb-2">{heading}</h3>}
        <ul className="list-disc pl-6">
          {items.map((item, i) => (
            <li key={i} className="text-gray-600 mb-1">
              {typeof item === 'object' && item.category ? `${item.category}: ${item.description}` : item}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">{deptName} Department Profile</h1>
      {(!deptData || !Array.isArray(deptData)) ? (
        <p className="text-red-600">Error: Invalid department data</p>
      ) : (
        deptData.map((section) => (
          <div key={section.id} className="mb-8 bg-white p-6 rounded-lg shadow-md">
            {/* Generic Section Handling */}
            {section.Desc && (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">About the Department</h2>
                {section.Image_1 && (
                  <img src={section.Image_1} alt={`${deptName} Department`} className="w-full h-64 object-cover rounded-md mb-4" />
                )}
                <p className="text-gray-600 mb-2">{section.Desc}</p>
                {section.Bold_para1 && <p className="font-bold text-gray-800 mb-2">{section.Bold_para1}</p>}
                {section.Bold_para2 && <p className="font-bold text-gray-800 mb-2">{section.Bold_para2}</p>}
                {section.Description && <p className="text-gray-600 mb-2">{section.Description}</p>}
                {section.para_list && renderList('', section.para_list)}
                {section.Table && section.Table.map((table, i) => (
                  <div key={i} className="mt-4">
                    {table.Img && <img src={table.Img} alt="Table Image" className="w-48 h-auto mb-2" />}
                    {table.list1 && renderList('', table.list1)}
                    {table.second_row && <p className="text-gray-600">{table.second_row}</p>}
                  </div>
                ))}
              </>
            )}

            {/* Vision and Mission */}
            {(section.Heading1 || section.descrption1) && (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{section.Heading1 || 'Vision'}</h2>
                <p className="text-gray-600 mb-2">{section.descrption1 || section.Description}</p>
              </>
            )}
            {section.Heading2 && (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{section.Heading2}</h2>
                {section.desc_list && renderList('', section.desc_list)}
              </>
            )}

            {/* Program Outcomes */}
            {section.Outcome && (
              <>
                {section.Outcome.map((out, i) => (
                  <div key={i} className="mb-4">
                    {out.Course && <h3 className="text-xl font-semibold text-gray-800">{out.Course}</h3>}
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{out.Heading}</h3>
                    {out.para && <p className="text-gray-600 mb-2">{out.para}</p>}
                    {out._outcome && renderList('', Array.isArray(out._outcome) ? out._outcome : [out._outcome])}
                  </div>
                ))}
              </>
            )}

            {/* Faculty Details */}
            {(section.Faculty_deatails || section.Table_data) && section.Table_heading && (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{section.Heading || 'Faculty Details'}</h2>
                {section.Faculty_deatails
                  ? renderTable('', section.Table_heading, section.Faculty_deatails.map(f => [f.Faculty_name, f.Designation]))
                  : renderTable('', section.Table_heading, section.Table_data || [])}
              </>
            )}

            {/* Facilities, Events, Achievements, etc. */}
            {(section.Facilities || section.Events || section.Achievements || section.Research_consultancy || section.Mous || section.Value_added_course || section.Content_beyond_syllabus || section.NPTEL || section.Library) && (
              <>
                {section.Facilities?.map((fac, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{fac.Heading}</h3>
                    {fac.Table_heading && fac.Table_data && renderTable('', fac.Table_heading, fac.Table_data)}
                    {fac.List && renderList('', fac.List)}
                  </div>
                ))}
                {section.Events?.map((ev, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{ev.Heading}</h3>
                    {ev.Table_heading && ev.Table_data && renderTable('', ev.Table_heading, ev.Table_data)}
                  </div>
                ))}
                {section.Achievements?.map((ach, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{ach.Heading}</h3>
                    {ach.Table_heading && ach.Table_data && renderTable('', ach.Table_heading, ach.Table_data)}
                  </div>
                ))}
                {section.Research_consultancy?.map((res, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{res.Heading}</h3>
                    {res.List && renderList('', res.List)}
                    {res.Table_heading && res.Table_data && renderTable('', res.Table_heading, res.Table_data)}
                  </div>
                ))}
                {section.Mous?.map((mou, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{mou.Heading}</h3>
                    {mou.Table_heading && mou.Table_data && renderTable('', mou.Table_heading, mou.Table_data)}
                  </div>
                ))}
                {section.Value_added_course?.map((vac, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{vac.Heading}</h3>
                    {vac.Table_heading && vac.Table_data && renderTable('', vac.Table_heading, vac.Table_data)}
                  </div>
                ))}
                {section.Content_beyond_syllabus?.map((cbs, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{cbs.Heading || 'Content Beyond Syllabus'}</h3>
                    {cbs.Table_heading && cbs.Table_data && renderTable('', cbs.Table_heading, cbs.Table_data)}
                  </div>
                ))}
                {section.NPTEL?.map((nptel, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{nptel.Heading}</h3>
                    {nptel.Sub_heading && <h4 className="text-lg font-medium text-gray-700 mb-2">{nptel.Sub_heading}</h4>}
                    {nptel.Table_heading && nptel.Table_data && renderTable('', nptel.Table_heading, nptel.Table_data)}
                  </div>
                ))}
                {section.Library?.map((lib, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{lib.Top_desc || 'Library'}</h3>
                    {lib.Table_heading && lib.Table_data && renderTable('', lib.Table_heading, lib.Table_data)}
                  </div>
                ))}
              </>
            )}

            {/* Contact and Miscellaneous */}
            {section.contact && (
              <>
                {section.contact.map((cont, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{cont.heading}</h3>
                    <p className="text-gray-600">{cont.category}: {cont.description}</p>
                  </div>
                ))}
              </>
            )}
            {section.Heading && !section.Library && !section.Outcome && !section.Faculty_deatails && !section.Facilities && (
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{section.Heading}</h2>
            )}
            {section.Description && !section.Library && <p className="text-gray-600 mb-2">{section.Description}</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default DepartmentProfile;
