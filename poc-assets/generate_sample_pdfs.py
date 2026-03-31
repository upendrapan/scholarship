from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


BASE_DIR = Path(__file__).resolve().parent
OUT_DIR = BASE_DIR / "pdfs"
OUT_DIR.mkdir(parents=True, exist_ok=True)


GUIDES = {
    "australia": {
        "title": "Full & Partial Scholarships - Australia",
        "rows": [
            ["Australia Awards", "Full", "31 Oct 2026", "dfat.gov.au/people-to-people/australia-awards"],
            ["Endeavour Leadership Program", "Partial / Full", "15 Aug 2026", "education.gov.au/endeavour-leadership-program"],
            ["UNSW Global Scholarships", "Partial", "30 Nov 2026", "unsw.edu.au/study/how-to-apply/scholarships"],
        ],
    },
    "usa": {
        "title": "Full & Partial Scholarships - USA",
        "rows": [
            ["Fulbright Program", "Full", "15 Sep 2026", "foreign.fulbrightonline.org"],
            ["Gates Scholarship", "Full", "01 Oct 2026", "thegatesscholarship.org"],
            ["Stanford Global Scholarships", "Partial", "30 Nov 2026", "stanford.edu/admission/financial-aid"],
        ],
    },
    "uk": {
        "title": "Full & Partial Scholarships - UK",
        "rows": [
            ["Chevening", "Full", "01 Nov 2026", "chevening.org/scholarships"],
            ["Rhodes", "Full", "30 Oct 2026", "rhodeshouse.ox.ac.uk/scholarships"],
            ["Commonwealth Scholarships", "Partial", "15 Sep 2026", "cscuk.fcdo.gov.uk/scholarships"],
        ],
    },
    "japan": {
        "title": "Full & Partial Scholarships - Japan",
        "rows": [
            ["MEXT", "Full", "31 Jul 2026", "studyinjapan.go.jp/en/smap-stopj-applications-scholarships"],
            ["JASSO", "Partial", "30 Aug 2026", "jasso.go.jp/en/ryugaku/scholarship_j"],
        ],
    },
    "india": {
        "title": "Full & Partial Scholarships - India",
        "rows": [
            ["TATA Scholarships", "Full", "31 Aug 2026", "tataeducationtrust.org"],
            ["INSA Scholarships", "Partial", "15 Sep 2026", "insaindia.res.in"],
            ["UGC Scholarships", "Partial", "30 Oct 2026", "ugc.gov.in/page/Scholarships-and-Fellowships.aspx"],
        ],
    },
}


def build_pdf(country_key: str, guide: dict) -> None:
    pdf_path = OUT_DIR / f"ScholarshipBoard-{country_key.upper()}-Guide.pdf"
    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=A4,
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
    )

    styles = getSampleStyleSheet()
    title_style = styles["Title"]
    subtitle_style = ParagraphStyle(
        "subtitle",
        parent=styles["BodyText"],
        fontSize=10,
        textColor=colors.HexColor("#1F2937"),
    )
    note_style = ParagraphStyle(
        "note",
        parent=styles["BodyText"],
        fontSize=9,
        textColor=colors.HexColor("#374151"),
        leading=13,
    )

    content = []
    content.append(Paragraph("ScholarshipBoard POC Guide", title_style))
    content.append(Spacer(1, 4 * mm))
    content.append(Paragraph(guide["title"], subtitle_style))
    content.append(Spacer(1, 6 * mm))

    data = [["Scholarship Name", "Full / Partial", "Deadline", "Apply Link"], *guide["rows"]]
    table = Table(data, colWidths=[62 * mm, 34 * mm, 24 * mm, 52 * mm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1C92D2")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, 0), 9),
                ("FONTSIZE", (0, 1), (-1, -1), 8.5),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#D1D5DB")),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F9FAFB")]),
                ("ALIGN", (2, 1), (2, -1), "CENTER"),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    content.append(table)
    content.append(Spacer(1, 6 * mm))
    content.append(Paragraph("Notes", styles["Heading4"]))
    content.append(
        Paragraph(
            "• This file is a POC sample for ScholarshipBoard.<br/>"
            "• Verify dates and eligibility on official scholarship websites before applying.<br/>"
            "• Need help? Message ScholarshipBoard on WhatsApp for support.",
            note_style,
        )
    )

    doc.build(content)


def main() -> None:
    for country_key, guide in GUIDES.items():
        build_pdf(country_key, guide)
    print(f"Generated {len(GUIDES)} PDF files in: {OUT_DIR}")


if __name__ == "__main__":
    main()
