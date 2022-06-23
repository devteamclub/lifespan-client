<template>
  <div>
    <TheHeader />
    <div
      v-if="getUser"
      class="home"
    >
      <div class="wrapper">
        <div class="progress">
          <AgeProgress :birthday="new Date(getUser.birthday)" />
          <div class="progress-title">A reflection of your year</div>
          <div class="time-interval">{{ previousBirthday }} - {{ nextBirthday }}</div>
          <div class="progress-text">
            Celebrate your birthday on {{ birthdayDate }}<br />
            with a lifetime achievement award,<br />
            NFT gift,<br />
            12 PLUSH COINS Reward <br />
          </div>
        </div>
        <div class="sections">
          <BirthdaySection class="section">
            <div slot="title">Reveal messages from the past</div>
            <div slot="progress">Revealed 2/3</div>
            <div slot="content">
              <div>You have 3 messages</div>
              <ul>
                <li>from yourself from May 12 2022</li>
                <li>from your mother May 12 2011</li>
                <li>from your schoolmate</li>
                <li>Birthday presents 3</li>
              </ul>
            </div>
          </BirthdaySection>
          <BirthdaySection class="section">
            <div slot="title">Financial Pulse</div>
            <div slot="progress">Executed 22/25</div>
            <div slot="content">
              <ul>
                <li>Lending 8</li>
                <li>Borrowing 10</li>
                <li>Staking 4</li>
              </ul>
            </div>
          </BirthdaySection>
          <BirthdaySection class="section">
            <div slot="title">Query onchain records</div>
            <div slot="progress">Revealed 2/3</div>
            <div slot="content">
              <ul>
                <li>NFT transfers 85 </li>
                <li>DAOs 4</li>
                <ul>
                  <li>Voting 42</li>
                </ul>
                <li>Multisig 8</li>
                <li>POAP 25 </li>
                <li>Awards 25</li>
                <li>Certificates 25</li>
              </ul>
            </div>
          </BirthdaySection>
          <BirthdaySection class="section">
            <div slot="title">Off-chain activities</div>
            <div slot="content">
              <ul>
                <li>last year memories 45</li>
                <li>juno activities 45/150</li>
                <a href="#">Add past activities</a>
              </ul>
            </div>
          </BirthdaySection>
          <BirthdaySection class="section">
            <div slot="title">Social Networks activities</div>
            <div slot="content">
              <ul>
                <li>Twitter. 12 / 185</li>
                <li>Instagram  5 / 45</li>
              </ul>
            </div>
          </BirthdaySection>
          <BirthdaySection class="section">
            <div slot="title">Add a visual layer to the token art</div>
            <div slot="content" style="overflow: hidden;">
              <div style=" float: right;width: 124px; height: 124px; background-color: #44d7b6; border-radius: 16px;"></div>
            </div>
          </BirthdaySection>
           <BirthdaySection class="section">
            <div slot="title">Set new goals for the next year</div>
            <div slot="content">
              <ul>
                <li>Goals 4</li>
                <a href="#">Compare previous goals </a>
              </ul>
            </div>
          </BirthdaySection>
          <BirthdaySection class="section">
            <div slot="title">Run future projection </div>
            <div slot="content">
              <ul>
                <li>New data points 5 /15</li>
                <a href="#">Add new data points </a>
              </ul>
            </div>
          </BirthdaySection>
        </div>
        <div class="button-container">
          <button class="button">RUN</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import TheHeader from '../components/Header.vue'
import { mapGetters } from 'vuex'
import BirthdaySection from '../components/BirthdaySection.vue'
import AgeProgress from '../components/AgeProgress.vue'

export default {
  components: {
    TheHeader,
    BirthdaySection,
    AgeProgress
},
  computed: {
    ...mapGetters(['getUser']),
    nextBirthday () {
      const current = moment()
      const birthday = moment(this.getUser.birthday)
      const diff = birthday.diff(current, 'days')

      if (diff >= 0) {
        return birthday.set('year', current.year()).format('MMMM YYYY')
      } else {
        return birthday.set('year', current.year() + 1).format('MMMM YYYY')
      }
    },
    previousBirthday () {
      const current = moment()
      const birthday = moment(this.getUser.birthday)
      const diff = birthday.diff(current, 'days')

      if (diff >= 0) {
        return birthday.set('year', current.year() - 1).format('MMMM YYYY')
      } else {
        return birthday.set('year', current.year()).format('MMMM YYYY')
      }
    },
    birthdayDate () {
      const birthday = moment(this.getUser.birthday)
      
      return birthday.format('MMMM DD')
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    box-sizing: border-box;
    padding: 20px 20px 80px;

    .wrapper {
      max-width: 1440px;
      margin: 0 auto;
      padding-top: 20px;

      .progress {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;

        .progress-title {
          padding-top: 48px;
          color: #000;
          font-weight: bold;
          font-size: 40px;
          font-family: Moranga, sans-serif;
        }

        .time-interval {
          color: #000;
          font-size: 24px;
          font-family: AvenirNextRoundedPro-Reg, sans-serif;
        }

        .progress-text {
          margin-top: 24px;
          font-size: 18px;
          font-family: Moranga, sans-serif;
          text-align: center;
        }
      }

      .sections {
        width: 928px;
        margin: 40px auto 0;

        .section {
          margin-top: 24px;

          &:first-child {
            margin-top: 0;
          }
        }
      }

      .button-container {
        margin-top: 40px;

        .button {
          display: block;
          min-width: 200px;
          margin: 0 auto;
          padding: 8px 32px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 16px;
          font-family: AvenirNextRoundedPro-Demi, sans-serif;
          background-color: rgba(#761192, 0.5);
          border-radius: 4px;
        }
      }
    }
  }
</style>
