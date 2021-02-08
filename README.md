# SDC-Questions-Answers
Retail "Questions and Answers" system design.

Author: Sean Brazil

This back-end app builds a MongoDB database and controlling routes for a retail Question/Answer component.

Designed to work with separated .csv data for rapid parsing and seeding, simple MongoDB shell commands seed and aggregate a complete database of embedded documents. The API quickly communicates with the database to GET and POST minimal data, reducing transfer times. Further optimization is needed for deployment, in addition to employing speed-enhancing technologies.

Built for AWS deployment and Docker containers, this app is designed to be modular and customizable. Current database design uses embedded documents, but can easily be used in a reference-based system. Additional tools will be added to increase performance.

In the future:

1. Full Docker design.
2. Redesigned database to eliminate unnecessary transfer.
3. Optimized API for higher speeds and less front-end data traversal.
