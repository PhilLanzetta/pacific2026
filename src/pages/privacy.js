import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'

const Privacy = () => {
  return (
    <Layout>
      <h1 className='privacy-page-title'>Privacy</h1>
      <div className='privacy-container'>
        <p>
          This Privacy Policy describes how www.pacificpacific.pub collects,
          uses, and discloses your Personal Information when you visit or make a
          purchase from the site.
        </p>{' '}
        <p>Collecting Personal Information</p>{' '}
        <p>
          When you visit the Site, we collect certain information about your
          device, your interaction with the Site, and information necessary to
          process your purchases. We may also collect additional information if
          you contact us for customer support. In this Privacy Policy, we refer
          to any information that can uniquely identify an individual (including
          the information below) as "Personal Information". See the list below
          for more information about what Personal Information we collect and
          why.
        </p>{' '}
        <p>Device information</p>
        <p>
          Examples of Personal Information collected: version of web browser, IP
          address, time zone, cookie information, what sites or products you
          view, search terms, and how you interact with the Site. Purpose of
          collection: to load the Site accurately for you, and to perform
          analytics on Site usage to optimize our Site. Source of collection:
          Collected automatically when you access our Site using cookies, log
          files, web beacons, tags, or pixels.
        </p>{' '}
        <p>
          Disclosure for a business purpose: shared with our processor Shopify.
        </p>
        <p>Order information</p>
        <p>
          Examples of Personal Information collected: name, billing address,
          shipping address, payment information (including credit card numbers,
          email address, and phone number.
        </p>{' '}
        <p>
          Purpose of collection: to provide products or services to you to
          fulfill our contract, to process your payment information, arrange for
          shipping, and provide you with invoices and/or order confirmations,
          communicate with you, screen our orders for potential risk or fraud,
          and when in line with the preferences you have shared with us, provide
          you with information or advertising relating to our products or
          services.
        </p>{' '}
        <p>Source of collection: collected from you.</p>
        <p>
          Disclosure for a business purpose: shared with our processor Shopify.
        </p>{' '}
        <p>Customer support information</p>{' '}
        <p>Examples of Personal Information collected:</p>
        <p>Purpose of collection: to provide customer support.</p>
        <p>Source of collection: collected from you.</p>
        <p>Disclosure for a business purpose:</p> <p>Minors</p>
        <p>
          The Site is not intended for individuals under the age of 18. We do
          not intentionally collect Personal Information from children. If you
          are the parent or guardian and believe your child has provided us with
          Personal Information, please contact us at the address below to
          request deletion.
        </p>
        <p>Sharing Personal Information</p>
        <p>
          We share your Personal Information with service providers to help us
          provide our services and fulfill our contracts with you, as described
          above. For example:
        </p>{' '}
        <p>
          We use Shopify to power our online store. You can read more about how
          Shopify uses your Personal Information here:{' '}
          <a
            href='https://www.shopify.com/legal/privacy'
            target='_blank'
            rel='noreferrer'
          >
            https://www.shopify.com/legal/privacy
          </a>
          .
        </p>{' '}
        <p>
          We may share your Personal Information to comply with applicable laws
          and regulations, to respond to a subpoena, search warrant or other
          lawful request for information we receive, or to otherwise protect our
          rights.
        </p>{' '}
        <p>
          Using Personal Information We use your personal Information to provide
          our services to you, which includes: offering products for sale,
          processing payments, shipping and fulfillment of your order, and
          keeping you up to date on new products, services, and offers.
        </p>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title='Privacy' />

export default Privacy
