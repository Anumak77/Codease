# Table of Contents

1. [Introduction](https://gitlab.computing.dcu.ie/wooh2/2024-ca326-aumak-customwebpagegenerator/-/blob/main/functional_spec/Functional_Specification.md?ref_type=heads#1-introduction)

2. [General Description](https://gitlab.computing.dcu.ie/wooh2/2024-ca326-aumak-customwebpagegenerator/-/blob/main/functional_spec/Functional_Specification.md?ref_type=heads#2-general-description)

3. [Functional Requirements](https://gitlab.computing.dcu.ie/wooh2/2024-ca326-aumak-customwebpagegenerator/-/blob/main/functional_spec/Functional_Specification.md?ref_type=heads#3-functional-requirements)

4. [System Architecture](https://gitlab.computing.dcu.ie/wooh2/2024-ca326-aumak-customwebpagegenerator/-/blob/main/functional_spec/Functional_Specification.md?ref_type=heads#4-system-architecture)  

5. [High-Level Design](https://gitlab.computing.dcu.ie/wooh2/2024-ca326-aumak-customwebpagegenerator/-/blob/main/functional_spec/Functional_Specification.md?ref_type=heads#5-high-level-design)

6. [Preliminary Schedule](https://gitlab.computing.dcu.ie/wooh2/2024-ca326-aumak-customwebpagegenerator/-/blob/main/functional_spec/Functional_Specification.md?ref_type=heads#6-preliminary-schedule)

7. [Appendices]()

---

# 1. Introduction 

## 1.1 Overview

## 1.2 Business Context

Note - may not be applicable to all projects

## 1.3 Glossary

### Drag and drop   
In graphical user interfaces for computers, drag and drop is a gesture performed with a pointing device. It involves the user selecting a virtual object by "grabbing" it and then moving or dropping it to a different location or onto another virtual object.

---

# 2. General Description

---

# 3. Functional Requirements

## 3.1 Template Editor

### Description

The Template Editor empowers users to create or modify HTML elements within webpage templates.

Basic Templates:  
The editor offers a variety of basic templates, each featuring distinct page layouts. These templates are designed to provide users with a diverse combination and arrangement of HTML elements.

Customization Options:  
Users have the flexibility to customize their chosen template. The Template Editor provides a comprehensive list of preset HTML elements, including navigation bars, sections, paragraphs, and lists. Through a simple [drag and drop](https://gitlab.computing.dcu.ie/wooh2/2024-ca326-aumak-customwebpagegenerator/-/blob/main/functional_spec/Functional_Specification.md?ref_type=heads#drag-and-drop) interface, users can select elements from the list and position them on the template. Once placed, users can easily edit the content of these elements. For text elements like headers, paragraphs, and lists, a double-click allows users to enter and modify the text within the container. Additionally, users can upload images and videos, placing them in the template through [drag and drop](https://gitlab.computing.dcu.ie/wooh2/2024-ca326-aumak-customwebpagegenerator/-/blob/main/functional_spec/Functional_Specification.md?ref_type=heads#drag-and-drop) actions.

Color Palette:  
The editor enables users to create a personalized color palette. These colors are automatically applied to the template, serving as font colors or background colors. Users can further refine the appearance by using a color picker to edit the font color or background color of each individual element.

Saving and Exporting:  
Upon completing the template edits, users can save their work to the system database. Furthermore, the editor facilitates the export of templates in a convenient zip file format. This file includes HTML, CSS, and JavaScript files, along with any uploaded image and video files, providing users with a comprehensive package for their customized templates.

### Criticality: High

The Template Editor stands as the paramount feature within our application. Given that our application is expressly designed to offer a user-friendly tool for non-programmers to create and edit webpage designs, the Template Editor plays a pivotal role in fulfilling this core objective. 

### Technical Issues

The design of the Template Editor interface should prioritize ease of learning and memorization. Given that the application caters to non-programmers, it's essential to replace technical terms like HTML tags with more user-friendly language to enhance the overall learnability of the interface.  

To provide users with a greater degree of flexibility in template design, the Template Editor should offer a diverse range of HTML elements.  

A critical consideration pertains to whether the template modifications should be automatically updated in the system database or manually saved by the user after clicking the "save" button. While autosaving is more convenient for users, it's crucial to assess its potential impact on server workload and system performance. Balancing convenience with performance implications is paramount in making an informed decision regarding the save mechanism.  

### Dependencies with Other Requirements

Template Library:  
Templates crafted through the Template Editor will appear in the Template Library if set to public visibility.
Users can select a template from the library, create a clone, and subsequently make modifications using the Template Editor.  

Main Page:  
Templates, whether created or edited by a user, will be showcased on the user's main page.
Users can either download these templates or continue to make further modifications.
The main page conveniently offers an option for users to access and open the Template Editor.  

Template Description:  
The Template Description feature provides users with the ability to duplicate a template and initiate modifications using the Template Editor.

## 3.2 Template Library

### Description

### Criticality

High

### Technical Issues

### Dependencies with Other Requirements

## 3.3 Login

### Description

### Criticality

High

### Technical Issues

### Dependencies with Other Requirements

## 3.4 Main Page

### Description

### Criticality

Medium

### Technical Issues

### Dependencies with Other Requirements

## 3.5 Template Description

### Description

### Criticality

Low

### Technical Issues

### Dependencies with Other Requirements

---

# 4. System Architecture

![System Architecture Diagram](diagrams/system_architecture.png)

---

# 5. High-Level Design

## Use Case Diagram
![Use Case Diagram](diagrams/use_case_diagram.png)

## Class Diagram
![Class Diagram](diagrams/class_diagram.png)

## Data Flow Diagram
![Data Flow Diagram](diagrams/data_flow_diagram.png)

---

# 6. Preliminary Schedule

![Gantt Chart](diagrams/gantt_chart.png)

# 7. Appendix

