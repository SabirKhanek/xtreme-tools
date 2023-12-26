import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { SubscribeSection } from "./home/sections/subscribe";
import "./contentPage.css";
export interface TOCProps {
  className?: string;
}
export function TOC({ className }: TOCProps) {
  return (
    <div className="flex-grow w-full flex flex-col">
      <Navbar bgClassApplied />
      <div className={`grow my-16 ${getResponsiveClasses()} ${className}`}>
        <h1 className="text-primary font-bold text-3xl">Terms & Conditions</h1>
        <p className="text-black/90">
          Welcome to our website. This site is maintained as a service to our
          customers. If you continue to browse and use this website, you are
          agreeing to comply with and be bound by the following terms and
          conditions of use, which together with our privacy policy govern
          xtreme tools relationship with you in relation to this website. Please
          review these terms and conditions carefully. If you do not agree to
          these terms and conditions, you should not use this site.
        </p>
        <h2 className="text-lg font-semibold text-primary">1. Agreement</h2>
        <p>
          This Agreement (the “Agreement’”) specifies the Terms and Conditions
          for access to and use of LearnWithHasan.com (the “Site”) and describes
          the terms and conditions applicable to your access to and use of the
          Site. This Agreement may be modified at any time by xtreme tools upon
          posting of the modified agreement. Any such modifications shall be
          effective immediately. You can view the most recent version of these
          terms at any time at https://xtreme.tools/terms TERMS PAGE. Each use
          by you shall constitute and be deemed your unconditional acceptance of
          this Agreement.
        </p>
        <h2 className="text-lg font-semibold text-primary">
          2. Intellectual Property Ownership
        </h2>
        <p>
          <strong>(a)</strong> Our Content. All content included on this site is
          and shall continue to be the property of xtreme tools or its content
          suppliers and is protected under applicable copyright, patent,
          trademark, and other proprietary rights. Any copying, redistribution,
          use, or publication by you of any such content or any part of the Site
          is prohibited without express written permission by xtreme tools.
          Under no circumstances will you acquire any ownership rights or other
          interest in any content by or through your use of this site.
          [Trademark] is the trademark or registered trademark of xtreme tools.
          Other product and company names mentioned on this Site may be
          trademarks of their respective owners. <br />
          <strong>(b)</strong> User Supplied Content. By accessing our forum,
          bulletin board, chat room, or any other user interactive area of our
          site, and placing any information in any of those areas, you hereby
          grant us a perpetual, irrevocable, royalty free license in and to such
          materials, including but not limited to the right to post, publish,
          transmit, distribute, create derivative works based upon, create
          translations of, modify, amend, enhance, change, display, and publicly
          perform such materials in any form or media, whether now known or
          later discovered. You also grant to others who access the forum,
          bulletin board, chat room or any other user interactive area of our
          site a perpetual, non-revocable, royalty free license to view,
          download, store and reproduce your postings but such license is
          limited to the personal use and enjoyment of such other party. <br />
          <strong>(c)</strong> Personal Use. xtreme tools grants you a limited,
          revocable, nonexclusive license to use this site and our proprietary
          content solely for your own personal use and not for republication,
          distribution, assignment, sublicense, sale, preparation of derivative
          works, or other use. You agree not to copy materials on the site,
          reverse engineer or break into the site, or use materials, products,
          or services in violation of any law. The use of this website is at the
          discretion of xtreme tools and xtreme tools may terminate your use of
          this website at any time. <br />
          <strong>(d)</strong> Other Uses. All other use of Content from the
          Site, including, but not limited to uploading, downloading,
          modification, publication, transmission, participation in the transfer
          or sale of, copying, reproduction, republishing, creation of
          derivative works from, distribution, performance, display,
          incorporation into another web site, reproducing the Site (whether by
          linking, framing or any other method), or in any other way exploiting
          any of the Content, in whole or in part, is strictly prohibited
          without xtreme tools prior express written consent.
        </p>

        <h2 className="text-lg font-semibold text-primary">3. Disclaimers</h2>
        <p>
          <strong>(a)</strong> DISCLAIMER OF WARRANTIES. THE INFORMATION ON THIS
          SITE IS PROVIDED ON AN ”AS IS,” “AS AVAILABLE” BASIS. YOU AGREE THAT
          USE OF THIS SITE IS AT YOUR SOLE RISK. Xtreme tools DISCLAIMS ALL
          WARRANTIES OF ANY KIND, INCLUDING BUT NOT LIMITED TO ANY EXPRESS
          WARRANTIES, STATUTORY WARRANTIES, AND ANY IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT. YOUR SOLE AND EXCLUSIVE REMEDY RELATING TO YOUR USE
          OF THE SITE SHALL BE TO DISCONTINUE USING THE SITE. FURTHERMORE,
          Xtreme tools DOES NOT WARRANT THAT USE OF THE SITE WILL BE
          UNINTERRUPTED, AVAILABLE AT ANY TIME OR FROM ANY LOCATION, SECURE OR
          ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE SERVICE IS
          FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. Xtreme tools, ITS
          SUBSIDIARIES, VENDORS, AND AFFILIATES DISCLAIM ANY RESPONSIBILITY FOR
          THE DELETION, FAILURE TO STORE, OR UNTIMELY DELIVERY OF ANY
          INFORMATION OR MATERIALS, AND ANY MATERIAL DOWNLOADED OR OTHERWISE
          OBTAINED THROUGH THE SITE. USE OF THE SITE’S SERVICES IS DONE AT YOUR
          OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY
          DAMAGES TO YOU COMPUTER SYSTEMS OR LOSS OF DATA THAT MAY RESULT FROM
          THE DOWNLOAD OF SUCH INFORMATION OR MATERIAL. <br />
          <strong>(b)</strong> LIMITATION OF LIABILITY. Xtreme tools SHALL NOT
          BE RESPONSIBLE OR LIABLE TO PROVIDERS OR ANY THIRD PARTIES UNDER ANY
          CIRCUMSTANCES FOR ANY INDIRECT, CONSEQUENTIAL, SPECIAL, PUNITIVE OR
          EXEMPLARY DAMAGES OR LOSSES, INCLUDING BUT NOT LIMITED TO, DAMAGES FOR
          LOSS OF PROFITS, GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSSES WHICH
          MAY BE INCURRED IN CONNECTION WITH Xtreme tools OR THE SITE, OR USE
          THEREOF, OR ANY OF THE DATA OR OTHER MATERIALS TRANSMITTED THROUGH OR
          RESIDING ON THE SITE OR ANY SERVICES, OR INFORMATION PURCHASED,
          RECEIVED OR SOLD BY WAY OF THE SITE, REGARDLESS OF THE TYPE OF CLAIM
          OR THE NATURE OF THE CAUSE OF ACTION, EVEN IF Xtreme tools HAS BEEN
          ADVISED OF THE POSSIBILITY OF DAMAGE OR LOSS.
        </p>
        <h2 className="text-lg font-semibold text-primary">
          4. Terms Relating to User Supplied Site Content
        </h2>
        <p>
          <strong>(a)</strong> Participate at Your Own Risk. You enter and
          participate in our forum, bulletin board, chat room, or any other user
          interactive area of our site, and gain access to the materials
          contained thereon at your own risk. <br />
          <strong>(b)</strong> No Monitoring. We do not monitor or screen
          communications on our forum, bulletin board, chat room, or any other
          user interactive area of our site and we are not responsible for any
          material that any of our forum, bulletin board, chat room, or any
          other user interactive area of our site participant posts and we do
          not assume the responsibility to do so. In the event that we are
          notified by any party that any communications contained in our forum,
          bulletin board, chat room, or any other user interactive area of our
          site is contrary to these terms, we may, but are not obligated to,
          investigate the situation and determine in our own discretion, whether
          to remove such communication from our forum, bulletin board, chat
          room, or any other user interactive area of our site. We have no
          liability or responsibility to investigate or remove any content from
          our forum, bulletin board, chat room, or any other user interactive
          area of our site based upon a complaint or otherwise. <br />
          <strong>(c)</strong> Your Reliance at Your Risk. We do not make any
          representations or warranties as to the truth or accuracy of any
          statement made or materials posted on or through our forum, bulletin
          board, chat room, or any other user interactive area of our site. You
          agree and acknowledge that you assume the risk of any actions you take
          in reliance upon the information that may be contained in our forum,
          bulletin board, chat room, or any other user interactive area of our
          site.
        </p>
      </div>
      <SubscribeSection />
      <Footer />
    </div>
  );
}
