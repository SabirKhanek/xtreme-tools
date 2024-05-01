import { Footer } from "../components/footer";
import { SubscribeSection } from "../components/home_sections/subscribe";
import { Navbar } from "../components/navbar";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import "./contentPage.css";
export default function PrivacyPolicy() {
  return (
    <div className="flex-grow w-full flex flex-col">
      <Navbar bgClassApplied />
      <div className={`grow my-16 ${"responsive"}`}>
        <h1 className="text-primary font-bold text-3xl">Privacy Policy</h1>
        <p className="my-3 text-black/70">Last Updated: 27-December-2023</p>
        <p className="text-black/90">
          Welcome to Xtreme Tools! This Privacy Policy is designed to inform you
          about the types of information we collect, how we use it, and the
          choices you have regarding your information. Please read this policy
          carefully. At Xtreme Tools, we're passionate about harnessing the
          power of artificial intelligence to transform the way you work and
          innovate. Our platform offers a suite of cutting-edge AI tools
          designed to empower businesses and individuals alike. <br />
          Whether you're seeking to streamline processes, enhance productivity,
          or unlock new possibilities, Xtreme Tools is your go-to destination
          for state-of-the-art AI solutions. Explore a world where technology
          meets creativity, and where innovation knows no bounds.
          <br /> Embark on a journey of discovery with Xtreme Tools, where the
          future of AI is at your fingertips. We're committed to delivering
          excellence, pushing boundaries, and helping you unlock the full
          potential of artificial intelligence.
        </p>
        <h2 className="text-lg font-semibold text-primary">
          Automatic Collection of Information
        </h2>
        <p>
          Xtreme tools records data about the individuals and the traffic to
          this website. xtreme tools is this website’s limited agent (and data
          controller in the EU context) for the purpose of providing Internet
          data and optimization services. Xtreme tools may use this data to
          improve its service or enable other services (e.g., using visitor
          traffic logs or data posted through the service to improve the
          optimization of other websites).
        </p>
        <h2 className="text-lg font-semibold text-primary">
          Personal Information
        </h2>
        <p>
          xtreme tools may collect personal information as defined in GDPR (such
          as IP address and a unique id in a cookie) about visitors to your
          website for the purposes of statistics, analytics, and
          personalization. In addition, xtreme tools works with numerous third
          parties for the collection and storage of data and the provision of
          analytics and advertising services.
        </p>

        <h2 className="text-lg font-semibold text-primary">
          Processing of Data & Consent
        </h2>
        <p>
          We will process the data we collect about you to improve the operation
          of this and other websites. This information helps us make decisions
          about what content to show, how it should be formatted, the number,
          size, and placement of advertisements, and how content should be
          delivered to individuals. This information is also used for the
          analysis of performance and reporting.
        </p>
        <h2 className="text-lg font-semibold text-primary">
          Use of Application Logs
        </h2>
        <p>
          Our servers automatically record information (“Application Log Data”)
          created by your use of this website. Application Log Data may include
          information such as your IP address, browser type, operating system,
          the referring web page, pages visited, location, your mobile carrier,
          device and application IDs, search terms, and cookie information. We
          use this information to diagnose and improve our services.
        </p>
        <h2 className="text-lg font-semibold text-primary">Data Retention</h2>
        <p>
          The personal information we collect is retained for no longer than
          necessary to fulfill the stated purposes in section “PROCESSING OF
          DATA AND CONSENT” above or for a period specifically required by law
          or regulation that xtreme tools is obligated to follow. Personal data
          used to fulfill verification of certain types of services such as SSL
          certificates, payments, and billing will be retained for a minimum of
          5 years depending on the class of product or service and may be
          retained in either a physical or electronic format. Even if you
          request deletion or erasure of your data, we may retain your personal
          data to the extent necessary and for so long as necessary for our
          legitimate business interests or performance of contractual
          obligations. After the retention period is over, xtreme tools securely
          disposes or anonymizes your personal information in order to prevent
          loss, theft, misuse, or unauthorized access.
        </p>
        <h2 className="text-lg font-semibold text-primary">
          Confidentiality / Security
        </h2>
        <p>
          We have implemented security policies, rules, and technical measures
          to protect the personal data that we have under our control from
          unauthorized access improper use or disclosure unauthorized
          modification unlawful destruction or accidental loss. All our
          employees and data processors, who have access to, and are associated
          with the processing of personal data, are obliged to respect the
          confidentiality of our visitors’ personal data. We ensure that your
          personal data will not be disclosed to State institutions and
          authorities except if required by law or other regulation
        </p>
      </div>
      <SubscribeSection />
      <Footer />
    </div>
  );
}
