---
title: Serial Project Management
slug: serial-project-management
publishDate: 2025-04-26
description: A semester project building Serial PM — a visual-first project management platform focused on bridging academic and corporate workflows.
tags: ["projects", "web-development"]
---

In Spring 2025 I spent a semester leading 6 engineers in creating **Serial PM**: a project management platform that strives to find a niche in the crowded productivity software space. Our team, **Zero Two**, embarked on a journey to create something to bridge the gap between the academic and corporate environment, and bring us closer to the real world of software development.

## Vision
Our goal was to create a uniquely visual-first project management framework that allows technical and administrative workers to track their tasks and progress side by side in one application and thus, one enterprise payment plan. We wanted to simplify the way product managers and developers keep track of project progress: collapsing all project management abstractions into one visual project timeline that keeps everyone on task, focused, and working with the same information but in their own lanes.

## Key Features
The heart of Serial PM lies in its intuitive task management system. Users can:

- Create and assign tasks with due dates, detailed comments and descriptions
- Automatically rank tasks by priority
- Organize work by project categories
- View tasks according to their role
- Message other users in their organization
- As a client: view project progress at a high level of detail

## Stack
Our application got us exposure and valuable time with relevant technologies:

- **Frontend**: React with Vite, styled using Tailwind CSS
- **Backend**: Node.js/Express API architecture
- **Database**: MySQL with proper relational design
- **Deployment**: AWS-hosted with CI/CD pipelines & elastic provisioning

## Architecture
We utilized a microservice architecture managed by an Express API gateway for: users, organizations, and external connections. All instructions for these microservices are stored in a parallel queue - a stack-like piece of middleware that can ensure an instruction isn’t skipped even if the service temporarily fails and has further request protection built in. We do load-balancing using Caddy, and cache many aspects of the application on the user-end and within Redis so that any short-term disconnections or processing isn’t a disruption to a user. We handle messaging, project storage, and users & organizations with MySQL & JWT, bcrypt.

Each microservice and our main application & middleware are containerized using Docker, to reduce any potential deployment errors or lack of dependencies and standardize the operation such that it will work without a VM on any machine. So far, this looks like two different node applications: our backend, and the main vertical prototype logic.
