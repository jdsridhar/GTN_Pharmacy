const acite = {
    "component": {
        "name": "SectionArea",
        "type": "ReactFunctionalComponent",
        "dependencies": [
            "React",
            "useState",
            "Modal",
            "PDFViewer"
        ]
    },
    "stateManagement": {
        "states": [
            {
                "name": "modalIsOpen",
                "type": "boolean",
                "initialValue": false
            },
            {
                "name": "selectedPdfUrl",
                "type": "string",
                "initialValue": ""
            }
        ],
        "functions": {
            "openModal": {
                "description": "Sets modalIsOpen to true and selectedPdfUrl to the file's full path.",
                "signature": "openModal(fileName: string)"
            },
            "closeModal": {
                "description": "Sets modalIsOpen to false and clears selectedPdfUrl.",
                "signature": "closeModal()"
            }
        }
    },
    "configuration": {
        "modal": {
            "library": "react-modal",
            "styles": {
                "content": {
                    "position": "fixed",
                    "top": "50%",
                    "left": "50%",
                    "width": "80%",
                    "height": "80%",
                    "transform": "translate(-50%, -50%)",
                    "background": "gray",
                    "padding": "20px"
                },
                "overlay": {
                    "zIndex": 1000
                }
            }
        },
        "pathPrefix": "/assets/docs/aicte/approvalcopies"
    },
    "data": {
        "title": "AICTE Approval Documents",
        "aictePdfFiles": [
            "2011-12.pdf",
            "2012-13.pdf",
            "2013-14.pdf",
            "2014-15.PDF",
            "2015-16.pdf",
            "2016-17.PDF",
            "2017-18.PDF",
            "2018-19.PDF",
            "2019-20.PDF",
            "2020-21.pdf",
            "2021-22.PDF",
            "2022-23.PDF",
            "2023-24.PDF",
            "2024-25(i).pdf",
            "2024-25(ii).pdf",
            "EOA Report 25-26.PDF"
        ]
    },
    "renderDetails": {
        "displayType": "Grid (col-md-3)",
        "element": "Button",
        "labelFormat": "Filename excluding the '.pdf' extension (e.g., '2011-12')",
        "onClickAction": "Calls openModal(filename)",
        "modalContent": "PDFViewer component, passing selectedPdfUrl (as 'pdfUrl') and closeModal (as 'onClose')"
    }
}

export default acite;